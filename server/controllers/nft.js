const User = require("../model/user");
const NFT = require("../model/nft");

// create NFT From Front
const createNFT = async (req, res) => {
  try {
    const nft = new NFT({
      address: req.body.address,
      tokenId: req.body.tokenId,
      tokenURI: req.body.tokenURI,
    });
    await nft.save();
    res.status(200).json("NFT saved successfully");
  } catch (err) {
    res.status(500).json("Invalid Request");
  }
};

// create NFT From Node
const createNFTNode = async (obj) => {
  const nft = new NFT({
    address: obj.address,
    tokenId: obj.tokenId,
    tokenURI: obj.tokenURI,
  });
  await nft.save();
  return "NFT saved successfully";
};

// get Single NFT
const getNFT = async (req, res) => {
  try {
    const nft = await NFT.findOne({ tokenId: req.params.tokenId });
    res.status(200).json(nft);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete NFT
const deleteNFT = async (req, res) => {
  try {
    const nft = await NFT.findOne({ tokenId: req.params.tokenId });
    if(nft.address === req.body.owner){
        await nft.delete();
        res.status(200).json("nft has been deleted");
    }else{
        res.status(403).json("you dont have ownership");
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

// update NFT
const updateNFT = async (req, res) => {
    
    try {
      const nft = await NFT.findOne({ tokenId: req.params.tokenId });

      if(nft.address === req.body.owner){
        await nft.updateOne({$set : {address : req.body.address}})
        res.status(200).json("nft has been updated");
      }else{
        res.status(403).json("you dont have ownership");
      }
  
    } catch (err) {
      res.status(500).json(err);
    }
  };

// get NFT
const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find({ address: req.body.address });
    res.status(200).json(nfts);
  } catch (err) {
    res.staus(500).json(err);
  }
};

module.exports = { createNFT, getAllNFTs, getNFT, deleteNFT, updateNFT };
