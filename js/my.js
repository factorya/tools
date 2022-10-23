var web3je = "./js/web3.min.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+web3je+'"></scr' + 'ipt>');
var etherje = "./js/ether.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+etherje+'"></scr' + 'ipt>');
var jqueryje = "./js/jquery.js";
document.write('<scr' + 'ipt type="text/javascript" src="'+jqueryje+'"></scr' + 'ipt>');
var walletWithProvider ;
var privateAddress;
var invinteAdr = window.location.hash.slice(1);
var inputPrivatekey;
var currentAddress ;


async function initWallet() {
    var web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access")
        }
    } else if (window.web3) {   
        web3Provider = window.web3.currentProvider;
    } else {
        // alert("！")
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(web3Provider);
    let provider = new ethers.providers.Web3Provider(web3.currentProvider);
    walletWithProvider = provider.getSigner();
    inputPrivatekey = $('#select-address');
     privateAddress = await walletWithProvider.getAddress();
     currentAddress = privateAddress.slice(0,4)+"XXXXX"+privateAddress.slice(-4);
    inputPrivatekey[0].innerHTML = privateAddress.slice(0,4)+"XXXXX"+privateAddress.slice(-4);
}

async function deploy(name,symbol,totalSupply,marketWallet) {
    var abi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "lib",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "newOwner",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "_market",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "txone",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "txtwo",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "liquidityFee",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "marketingFee",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name_",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "symbol_",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_totalAmount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct IToken.tokenInfo",
                    "name": "_tokenInfo",
                    "type": "tuple"
                }
            ],
            "name": "createMetaCoin",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "adr",
                    "type": "address"
                }
            ],
            "name": "getUserCreateAdr",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "libraryAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "ownerAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_libraryAddress",
                    "type": "address"
                }
            ],
            "name": "setLibraryAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "userCreates",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    if (!walletWithProvider) {
        alert("No wallet connected");
    }

    let contract = new ethers.Contract("0x492f79D03d99f8c5489F7aa05aBA44bdDF9D31E0", abi, walletWithProvider);
    // if(invinteAdr&&invinteAdr.slice(0,2)=="0x"){
    //   var claim = await contract.smashEggs(amount,{value: amountNew});
    // }else{
    //   var claim = await contract.smashEggs("0x277CA0E6e06a39Ddb3BBE4460de05E3bD0C5c4Aa",{value: amountNew});
    // }
    // var inputPrivatekeyNews = $('#linkinput');
    // inputPrivatekeyNews[0].value = "https://squid.baby/index.html#"+privateAddress;   
    const obj =    { newOwner:privateAddress,
    _market:marketWallet,
    txone:"3",
    txtwo:"3",
    liquidityFee:"1",
    marketingFee:"2",
     name_:name,
    symbol_:symbol,
    _totalAmount:totalSupply
    }    
    var claim = await contract.createMetaCoin(obj);    
}
