var books = require('google-books-search');



function duplicationKiller (tabInterests) {
    return new Promise(function(resolve,reject) {
        var tmp = [];
        for(var i = 0; i < tabInterests.length; i++){
            if(tmp.indexOf(tabInterests[i]) == -1){
                tmp.push(tabInterests[i]);
            };
        };

        resolve(tmp);
        reject(tmp);
    });

};


function  categoryDetecter(bookName) {
    return new Promise(function(resolve,reject){
        console.log("The book Name : "+ bookName);
        var interests =[];
        books.search(bookName, function(error, results) {

            if ( ! error ) {

                // console.log('rsults');
                // console.log(results); working
                for (var i = 0, len = results.length; i < len; i++) {
                    console.log('rsults [i]');
                    console.log(results[i]);
                    if(results[i].categories!==undefined) {
                        tab=results[i].categories;

                        for (var x=0,lenght=tab.length ;x<lenght;x++){
                            interests.push(tab[x]);

                        }
                    }

                }

                duplicationKiller(interests).then(function (interests2) {
                        resolve(interests2);

                    }
                );

            } else {
                console.log(error);
                console.log("the book not found  found");
                reject(error);
            }
        });

    });
};

module.exports.booksFecher=function (bookList) {


    return new Promise(function (resolve,reject) {
        console.log('books list ');
        //  console.log(bookList);
        var actions =bookList.map(categoryDetecter);
        var results = Promise.all(actions);

        results.then(function (data) {

                resolve(data);
            }
        );


    });
};

module.exports.listConcater=function list(booksTab,interests){
    return new Promise(function(resolve,reject){

        var tab;

        for (var x=0,lenght=booksTab.length ;x<lenght;x++){

            tab =booksTab[x];

            for (var i=0,len=tab.length ;i<len;i++){

                interests.push(tab[i]);
            }


        };
        //  console.log(interests);
        resolve(interests)
    });






};







