$(document).on('click', '#submit', function(event){
    event.preventDefault();
    var name = $('#name').val();
    var photo = $('#photo').val();
    var q1 = $('#q1').val();
    var q2 = $('#q2').val();
    var q3 = $('#q3').val();
    var q3 = $('#q3').val();
    var q4 = $('#q4').val();
    var q5 = $('#q5').val();
    var q6 = $('#q6').val();
    var q7 = $('#q7').val();
    var q8 = $('#q8').val();
    var q9 = $('#q9').val();
    var q10 = $('#q10').val();
    if (name === null || photo === null || q1 === null || q2 === null || q3 === null || q4 === null || q5 === null || q6 === null || q7 === null || q8 === null || q9 === null || q10 === null ){
        alert('Please fill out the entire survey before hitting "Submit" ');
    } else {
        var user = {
            name: name,
            photo: photo,
            q:[
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                q9,
                q10
            ]
        };
        var friends = '../data/friends'
        $.ajax({
            type: 'POST',
            url: friends,
            data: user,
            success: function(){
                console.log('POST successful!');
                getData(user);
            },
            error: function(){
                console.log('Something went wrong, sorry. :(');
            },
            dataType: 'text'
        })
    }
});

function getData (user) {
    var friendsAPI = '/api/friends'
    $.ajax({
        type: 'GET',
        url: friendsAPI,
        success: function(res){
            compare(res, user);
        }
    })
}
function compare(res, user){
    var matchiest;
    for (var i = 0; i < res.length - 1; i++) {
        var difArray = [];
        var sum = 0;
        for(var j = 0; j < 10; j++){
            var a = res[i].q[j];
            var b = user.q[j];
            var qDif = Math.abs(a - b);
            difArray.push(qDif);
        }
        for ( var k = 0; k < difArray.length; k++){
            sum += difArray[k];
        }
        res[i].sumDif = sum;
        if(!matchiest || matchiest.sumDif > sum){
            matchiest = res[i];
        }
    }
    console.log('Your best match is this one, with a difference of : ' + matchiest.sumDif);
    console.log(matchiest);
    modalMaker(matchiest);
};

function modalMaker (match) {
    var doc = $('body');
    var m1 = $('<div class = "modal fade" id = "ModalDiv" role = "dialog" ></div>');
    var m2 = $('<div class = "modal-dialog"></div>');
    var m3 = $('<div class = "modal-content"></div>');
    var mh = $('<div class = "modal-header></div>');
    var mt = $('<h3 class = "modal-header">Meet your Match!</h3>');
    var mhb = $('<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;</span></button>');
    var mb = $('<div class = "modal-body" style = "align-content: center;"></div>');
    var mf = $('<div class = "modal-footer"></div>');
    var mfb = $('<button type = "button" class = "btn btn-secondary" data-dismiss = "modal">Close</button>');
    var img = $('<img src = "' + match.pic + '" style = "width: 100%; height: auto;">' )
    var name = $('<h4>' + match.name + '</h4>');
    $(m1).appendTo(doc);
    $(m2).appendTo(m1);
    $(m3).appendTo(m2);
    $(mh).appendTo(m3);
    $(mt).appendTo(mh);
    $(mhb).appendTo(mh);
    $(mb).appendTo(m3);
    $(name).appendTo(mb);
    $(img).appendTo(mb);
    $(mf).appendTo(m3);
    $(mfb).appendTo(mf);
    $('#ModalDiv').modal("show");
};