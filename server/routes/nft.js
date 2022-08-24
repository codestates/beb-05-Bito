const router = require("express").Router();
const { createNFT, getAllNFTs, getNFT, deleteNFT, updateNFT } = require("../controllers/nft");

// get feed nfts
router.post("/creation", createNFT);
router.get("/:tokenId", getNFT);
router.put('/:tokenId', updateNFT)
router.delete("/:tokenId", deleteNFT);
router.get("/", getAllNFTs);

module.exports = router;
