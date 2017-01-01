


let openBtn = $('#open__chat_btn'),
    closeBtn = $('.chat__close_btn'),
    chatBlock = $('.chat__block'),
    submitBtn = $('.submit__btn'),
    msgText = $('#submit__message'),
    msgDisplay = $('.chat__message_display').find('.chat__message_content'),
    responceDisplay = $('.chat__message_right').find('.chat__message_content'),
    resp;

/* openBtn.on('click',function (e) {
 e.preventDefault();
 chatBlock.show();
 openBtn.hide();
 });
 
 closeBtn.on('click',function (e) {
 e.preventDefault();
 chatBlock.hide();
 openBtn.show();
 });*/

$("#chat").animate({
    scrollTop : chatBlock.height()
});

function getAnswer(request) {
    let responce;
    
    $.post('/api/get-answer',
        {
            q : request
        })
        .done(
            function (resp) {
                if (resp.ok) {
                    responce = resp.a;
                    alert(responce);
                }
                else {
                    alert(resp.error);
                }
            }
        );
}

submitBtn.on('click', function (e) {
    let msg=msgText.val();
    e.preventDefault();
    
    getAnswer(msg);

    msgText.val('');
    
    
});


//Defining database
/*let async = Dexie.async,
 spawn = Dexie.spawn;
 
 let db = new Dexie('ChatMessagesDb');
 
 db.version(1).stores({
 messages : 'userName,dateTime,msgText'
 });
 
 
 //Open Database
 db.open().catch(function (e) {
 alert('Open Failed:' + e);
 });
 
 //Adding data to database
 db.messages.put({
 userName : 'Eugene',
 dateTime : '23/10/1979',
 msgText : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
 
 }).then(function () {
 
 //read from db
 return db.messages.get('Eugene');
 }).then(function (user) {
 
 //display result
 alert(user.userName + " wrote last msg on " + user.dateTime);
 }).catch(function (error) {
 
 //errors handler
 alert('ooops: ' + error);
 });*/






