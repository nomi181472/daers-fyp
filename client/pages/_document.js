import Document, {Head,Main,NextScript,Html} from "next/document";
export default class MyDocument extends Document{
    render(){
        return (
            <Html>
            
                <Head>
                
                <link href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css" rel="stylesheet"/>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"async/>  
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossorigin="anonymous" />
                </Head>
                <body>
                    <Main />
                    <NextScript/>

                </body>
                <style global jsx>
            {`
            body{
                margin:0;
                
            }
            `}
                </style>
            </Html>
        )
    }
}