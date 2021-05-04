import torch
import torch.nn as nn
import torch.optim as optim
import random
from torchtext.data import Field, TabularDataset, BucketIterator
import spacy

spacy_en = spacy.load("en_core_web_sm")


def tokenize(text):
    return [tok.text for tok in spacy_en.tokenizer(text)]



german = Field(sequential=True, use_vocab=True, tokenize=tokenize,
               lower=True, init_token="<sos>", )
english = Field(sequential=True, use_vocab=True, tokenize=tokenize,
               lower=True, init_token="<sos>", )
field = {"source": ("src", german), "target": ("trg", english)}

train_data, test_data = TabularDataset.splits(
    path="data",
    train="sequence-to-sequence.csv",
    test="sequence-to-sequence.csv",
    format="csv",
    fields=field)

german.build_vocab(train_data, max_size=10000, min_freq=1)

english.build_vocab(test_data, max_size=10000, min_freq=1)
num_epochs = 20
learning_rate = 0.001
batch_size = 32
train_iterator, test_iterator = BucketIterator.splits((train_data, test_data),
                                                      batch_size=batch_size,
                                                      sort_within_batch=True,
                                                      sort_key=lambda x: len(x.src),
                                                      device="cpu")


class Encoder(nn.Module):
    def __init__(self, input_size,  # input size=size of the vocabulary
                 embedding_size,  # embedding size each word is to map some d dimension
                 hidden_size,
                 num_layers,
                 dropout):
        super(Encoder, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.dropout = nn.Dropout(dropout)
        self.embedding = nn.Embedding(input_size, embedding_size)
        self.rnn = nn.LSTM(embedding_size, hidden_size, num_layers,
                           bidirectional=True,)

        self.fc_hidden = nn.Linear(hidden_size * 2, hidden_size)
        self.fc_cell = nn.Linear(hidden_size * 2, hidden_size)

    def forward(self, x):
        # x shape: (seq_length,N) where n is batch size
        embedding = self.dropout(self.embedding(x))
        # embedding shape (seq_length,N,Embedding_size)
        encoder_states, (hidden, cell) = self.rnn(embedding)
        hidden = self.fc_hidden(torch.cat((hidden[0:1], hidden[1:2]), dim=2))
        cell = self.fc_cell(torch.cat((cell[0:1], cell[1:2]), dim=2))
        return encoder_states, hidden, cell


class Decoder(nn.Module):  # note hidden size encoder and decorder will be same
    def __init__(self, input_size, embedding_size, hidden_size, output_size,
                 num_layers, dropout):
        super(Decoder, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        self.dropout = nn.Dropout(dropout)

        self.embedding = nn.Embedding(input_size, embedding_size)
        self.rnn = nn.LSTM(hidden_size * 2 + embedding_size,
                           hidden_size, num_layers, )

        self.energy = nn.Linear(hidden_size * 3, 1)
        self.softmax = nn.Softmax(dim=0)
        self.relu = nn.ReLU()
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x, encoder_state, hidden, cell):
        # shape of x (N) but we want (1,N)
        x = x.unsqueeze(0)
        embedding = self.dropout(self.embedding(x))
        # embedding shape (1,N embeding_size)
        sequence_length = encoder_state.shape[0]
        h_reshaped = hidden.repeat(sequence_length, 1, 1)
        energy = self.relu(self.energy(torch.cat((h_reshaped, encoder_state), dim=2)))

        attention = self.softmax(energy)  # seq_length,n,1
        attention = attention.permute(1, 2, 0)  # n,1,seq_length*2
        encoder_state = encoder_state.permute(1, 0, 2)

        # encoder states:
        # torch.bmm
        context_vector = torch.bmm(attention, encoder_state).permute(1, 0, 2)
        rnn_input = torch.cat((context_vector, embedding), dim=2)

        output, (hidden, cell) = self.rnn(rnn_input, (hidden, cell))
        # shape of outputs (1,N, hidden siz)e
        prediction = self.fc(output)
        # shape of prediction (1,N,length_of_vocab)
        prediction = prediction.squeeze(0)
        return prediction, hidden, cell


class Seq2Seq(nn.Module):
    def __init__(self, encoder, decoder):
        super(Seq2Seq,self).__init__()
        self.encoder = encoder
        self.decoder = decoder

    def forward(self, source, target, teacher_force_ratio=0.5):
        batch_size = source.shape[1]
        target_length = target.shape[0]
        target_vocab_size = len(english.vocab)
        outputs = torch.zeros(target_length, batch_size, target_vocab_size).to(device)

        encoder_states,hidden, cell = self.encoder(source)

        # grab start of token
        x = target[0]
        for t in range(1, target_length):
            output, hidden, cell = self.decoder(x, encoder_states,hidden, cell)
            outputs[t] = output
            # (n,English vocab size
            best_guess = output.argmax(1)
            x = target[t] if random.random() < teacher_force_ratio else best_guess

        return outputs


# now were are ready to training

# training hyperparameters



# model hyperparameters
load_model = False
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
input_size_encoder = len(german.vocab)
input_size_decoder = len(english.vocab)
output_size = len(english.vocab)
encoder_embedding_size = 300
decoder_embedding_size = 300
hidden_size = 1024
num_layers = 1
enc_dropout = 0.5
dec_dropout = 0.5


encoder_net = Encoder(input_size_encoder, encoder_embedding_size
                      , hidden_size, num_layers, enc_dropout)
decoder_net = Decoder(input_size_decoder, decoder_embedding_size
                      , hidden_size, output_size, num_layers, dec_dropout)

model = Seq2Seq(encoder_net, decoder_net).to(device)
optimizer = optim.Adam(model.parameters(), lr=learning_rate)
pad_idx = english.vocab.stoi["<pad>"]
criterion = nn.CrossEntropyLoss(ignore_index=pad_idx)

for epoch in range(num_epochs):
    print(f'Epoch[{epoch}/{num_epochs}]')
    # checkpoint
    # save checkpoint
    for batch_idx, batch in enumerate(train_iterator):
        inp_data = batch.src.to(device)
        target = batch.trg.to(device)

        output = model(inp_data, target)  # (trg_len,batch_Size,Output_dim)
        # (N,10) and targets would be (N(
        output = output[1:].reshape(-1, output.shape[2])
        target = target[1:].reshape(-1)

        optimizer.zero_grad()
        loss = criterion(output, target)
        loss.backward()

        torch.nn.utils.clip_grad_norm(model.parameters(), max_norm=1)
        optimizer.step()

        print(loss, )
        # step += 1





