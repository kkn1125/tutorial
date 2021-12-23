const tutorialList = [];

const setTutorialList = function(item){
    return [...tutorialList, {
        name: item['name'],
        target: item['target'],
        message: item['message'],
        order: tutorialList.length,
        created: new Date().toLocaleString(),
    }];
}

module.exports = setTutorialList;