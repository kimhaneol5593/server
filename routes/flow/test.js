const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserTb = require('../../models/userTb.model');
const YtbChannelTb = require("../../models/ytbChannelTb.model");
const ShareFlowTb = require("../../models/shareFlowTb.model")
const UserTagTb = require('../../models/userTagTb.model');
const userTagTb = require('../../models/userTagTb.model');

router.get('/userTb', (req, res, next) => {
  UserTb.find()
    .populate('folders.stores.ytbStoreTbId')
    .populate('folders.stores.attractionTbId')
    // .select("name price _id")  
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            userTbs: docs.map(doc => {
                return {
                    _id: doc._id,
                    userId: doc.userId,
                    social: doc.social,
                    nickname: doc.nickname,
                    photoUrl: doc.photoUrl,
                    shareCount: doc.shareCount,
                    memo: doc.memo,
                    likeYoutuber: doc.likeYoutuber,
                    likeFlows: doc.likeFlows,
                    folders: doc.folders,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/userTb/' + doc.userId
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/userTagTb', (req, res, next) => {
  UserTagTb.find()
    // .select("name price _id")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            userTagTbs: docs.map(doc => {
                return {doc
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

 router.get('/shareFlowTb', (req, res, next) => {
        ShareFlowTb.find()
        .select()
        .populate('userTbId')
        // .populate({
        //     path: 'userTbId',
        //     populate: { path: '' }
        // })
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                shareFlowTb: docs.map(doc => {
                    return {
                        _id: doc._id,
                        userId: doc.userId,
                        shareTitle: doc.shareTitle,
                        shareThumbnail: doc.shareThumbnail,
                        folderTitle: doc.folderTitle,
                        adminTag: doc.adminTag,
                        userTags: doc.userTags,
                        shareDate: doc.shareDate,
                        updateDate: doc.updateDate,
                        likeCount: doc.likeCount,
                        hits: doc.hits,
                    }
                })
            });
            
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
router.get('/user/:user', (req, res, next) => {
    mongoose.set('useFindAndModify', false);
    UserTb.findByIdAndRemove(req.params.user)
    .exec()
    .then(doc => {
        res.status(200).json({
            doc
        })
    })
})

// ???????????? ?????? ?????????
router.post('/hastag', async (req, res, next) => {
    mongoose.set('useFindAndModify', false);
    // ?????? ?????? ????????? ?????? ?????????
    const tag = await UserTagTb.find()
    .exec()

    console.log(tag);
                    await UserTagTb.findByIdAndUpdate(tag._id, tag)
})

// ???????????? ?????? ?????????
router.delete('/tagDelete', (req, res, next) => {

}) 

// stores ??????
router.post('/put', async(req, res, next) => {
    // req.body.userId = "payment"
    //     // user ?????? ??????
    //     const user = await UserTb
    //         .findOne({
    //             "userId": req.body.userId
    //         })
    //         .exec()
    //         let index = 0
    //         let tmp = 0
    //         user.folders.forEach(element => {
    //             if(element._id == req.body.folderId) {
    //                 index = tmp;
    //             }
    //             tmp++;
    //         });


    // const stores = [
    //     {
    //         _id: "5fb797beaf3c922f9490fab9",
    //         ytbStoreTbId: "5fb76382f89ca73168b311ab",
    //         attractionTbId: null,
    //         storeId: '5fb76382f89ca73168b311ab',
    //         typeStore: '??????'
    //       },
    //       {
    //         _id: "5fb797beaf3c922f9490fab8",
    //         ytbStoreTbId: "5fb7638df89ca73168b311ad",
    //         attractionTbId: null,
    //         storeId: '5fb7638df89ca73168b311ad',
    //         typeStore: '??????'
    //       }
    // ]
    // user.folders[index].stores = stores
    // mongoose.set('useFindAndModify', false);
    //     // ?????? store ????????? update ?????????
    //     await UserTb
    //     .findOneAndUpdate({
    //         "userId": req.body.userId
    //     }, user)
    //     .exec()
    //     .then(doc => {
    //         res.status(201).json(doc)
    //     })
    
        
    
})
// // ?????? ??????
// router.get('/rank/',  async (req, res, next) => {
//     setInterval(rank(), 30)
// })


router.get('/ytbChannelTb', (req, res, next) => {
    YtbChannelTb.find()
    .select()
    .populate('video.ytbStoreTbId')
    .exec()
    .then(docs => {
        res.status(200).json(
            docs
            )
        })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});


// // ???????????? ?????? ?????? ??????
// router.get('/userTag', async (req, res, next) => {
//     mongoose.set('useFindAndModify', false);
//     const tag = await UserTagTb.findOne({_id:'5fb7a29bf648764c3cb9ebeb'})
//     .exec()
//     console.log(tag)
//     // .then(doc => {
//     //     res.status(200).json(doc)
//     // })

//     const share =await ShareFlowTb.find()
//     .exec()

//     let newTag = []
//     tag.userTag.forEach(element => {
//         newTag.push({userTag: element, useCount: 0})
//     })
    
//     newTag.forEach(element => {
//         share.forEach(flow => {
//             if(flow.userTags.includes(element.userTag)) {
//                 element.useCount++;
//             }
//         })
//     });
//     console.log(newTag)
    
//     await UserTagTb.findOneAndUpdate({_id:'5fb7a29bf648764c3cb9ebeb'}, {userTag : newTag}, {
//         new: true
//     })
//     .exec()
//     .then(doc => {
//         res.status(200).json(doc)
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });

// });

// ????????? ????????? ??????
// 3????????? ?????? ??????
router.get('/videoRank', async(res, req, next) => {
    //setInterval(async function  rank() {
    //     try {
    //       // ????????? ?????? ??????
    //         mongoose.set('useFindAndModify', false);
    //         //?????? ????????? ?????? ??????
    //         const youtuber = await YtbChannelTb.find()
    //         // ????????? ytbSubscribe??? ?????? ???
    //         .sort('ytbSubscribe')
    //         .exec()
    //         let i = 1;
    //         youtuber.forEach(async element => {
    //             element.ytbRankIncrease = i;
    //             if(!element.ytbRank) {
    //                 element.ytbRank = i;
    //             }
    //             i++;

    //             await YtbChannelTb.findOneAndUpdate({_id: element._id}, element)
    //             .exec();
                
    //         })
    //         console.log(youtuber)

    //         // ????????? ?????? ??????
    //         const ytbVideo = await YtbChannelTb.find()
    //         .sort('video.hitsIncrease' - 'video.hits')
    //         .select('video')
    //         .exec()

    //         let tmp = ytbVideo.map(doc => doc.video)
    //         let video = []
    //         tmp.forEach(element => {
    //             element.forEach(i => {
    //                 video.push(i)
    //             }
    //             )
    //         })

    //         video = video.sort(function(a, b) {
    //             return b.hits - a.hits
    //             //return (b.hitsIncrease - b.hits) - (a.hitsIncrease - b.hits)
    //         })
      
    //         // ????????? video ?????? ??????
    //         let result = []
    //         tmp.forEach(ytb => {       
    //             ytb.forEach(element => {
    //                 if(!element.Rank) {
    //                     element.Rank = video.indexOf(element) + 1
    //                 }
    //                 element.RankIncrease = video.indexOf(element) + 1
    //                 result.push(element)

    //             })
    //         })
            
    //         ytbVideo.forEach(async ytb => {
    //             await YtbChannelTb.findByIdAndUpdate(ytb._id, ytb)
    //             .exec()
                
    //         })
    //         console.log("??????")

            
      
    //     } catch(e) {
    //         console.error("error")
            
    //     }
    // //  }, 259200000);
    })   
     


//  // ???????????? ?????????
// router.delete('/deleteTag', async(res, req, next) => {
//     mongoose.set('useFindAndModify', false);
//     const tag = await UserTagTb.findOne({_id: '5fb7a29bf648764c3cb9ebeb'})
//     .exec()

//     tag.userTag = tag.userTag.filter(doc => doc.userTag != "??????")
//     console.log(tag);
//       await UserTagTb.findOneAndUpdate({_id : '5fb7a29bf648764c3cb9ebeb'}, tag)
//         .exec()
//         .catch(err => {
//             res.status(500).json("???????????? ????????? ?????????????????????.");
//         });
// })


module.exports = router;