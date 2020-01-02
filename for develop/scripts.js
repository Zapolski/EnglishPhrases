
$('.music-button').click(
    function (e) {
        audioEl = $(this).closest('td')[0].getElementsByTagName('audio')[0];
        audioEl.playbackRate = $(this).closest('td')[0].getElementsByClassName('speed')[0].value;
        audioEl.play();
    }
);

$('.show_question').change(
    function () {
        if ($(this).is(":checked")) {
            $(this).closest('tr')[0].getElementsByClassName('question')[0].classList.remove('question_hidden');
            if ( $(this).closest('tr')[0].getElementsByClassName('support').length > 0 ) {
                $(this).closest('tr')[0].getElementsByClassName('support')[0].classList.remove('question_hidden');    
            }
            return;
        }
        $(this).closest('tr')[0].getElementsByClassName('question')[0].classList.add('question_hidden');
        if ( $(this).closest('tr')[0].getElementsByClassName('support').length > 0 ){
            $(this).closest('tr')[0].getElementsByClassName('support')[0].classList.add('question_hidden');    
        }
    }
);

$('input').keyup(
    function () {

        if ($(this).hasClass('invalid')) {
            $(this).removeClass('invalid')
        }

        if ($(this).hasClass('correct')) {
            $(this).removeClass('correct')
        }

        if (event.keyCode == 13) {

            var actualVal = "";
            tipColl = $(this).closest('td')[0].getElementsByClassName('tip');
            for (let i=0; i<tipColl.length; i++){
                actualVal = actualVal + tipColl[i].innerHTML;
            }
            actualVal = actualVal.replace(/[\[\]]/g,"");

            var currentVal = $(this).val();
            var checkDiv = $(this).closest('td')[0].getElementsByClassName('check')[0];

            currentVal = currentVal.replace(/[,:;?.!]/g, "").replace(/[ ]{2,}/g, " ");
            actualVal = actualVal.replace(/[,:;?.!]/g, "").replace(/[ ]{2,}/g, " ");

            $(this).closest('tr')[0].getElementsByClassName('music-button')[0].click();

            if (currentVal != actualVal) {
                $(this).addClass('invalid');
                checkDiv.innerHTML = checkTranslate(actualVal, currentVal);
            } else {
                $(this).addClass('correct');
                checkDiv.innerHTML = '';
            }
        }
    }
);

$('input[type=range]').on('input change', function () {
    $(this).nextAll('.speed-text')[0].innerHTML = parseFloat($(this).val()).toFixed(1);
});

$('input').keydown(
    function (){
        if (event.keyCode == 40) {
            console.log('down');

            let currentVal = Number($(this).closest('tr')[0].getElementsByClassName('speed')[0].value) - 0.1;
            $(this).closest('tr')[0].getElementsByClassName('speed')[0].value = currentVal;
            $(this).closest('tr')[0].getElementsByClassName('speed')[0].dispatchEvent(new Event("change"));
            console.log( currentVal );
        }
        if (event.keyCode == 38) {
            console.log('up');

            let currentVal = Number($(this).closest('tr')[0].getElementsByClassName('speed')[0].value) + 0.1;
            $(this).closest('tr')[0].getElementsByClassName('speed')[0].value = currentVal;
            $(this).closest('tr')[0].getElementsByClassName('speed')[0].dispatchEvent(new Event("change"));
            console.log( currentVal );            
        }        
    }
)

$('.shuffle_button').click(
    function () {
        $tr = $('tr');
        $tr.detach();
        $tr = shuffle($tr);
        $('table').append($tr);
    }
)

$('.show_button').click(
    function () {
        $("input[type=checkbox]").prop('checked', true).trigger('change');
    }
)

$('.hide_button').click(
    function () {
        $("input[type=checkbox]").prop('checked', false).trigger('change');
    }
)

$('.test_button').click(
    function () {
        console.log('inside test_button click');
        //$('.question').animate({ opacity: "hide" }, "slow");
    }
)

function shuffle(arr) {
    var j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

$('tr').mouseover(
    function(){
        $(this).css({
            'background-color': '#fdfdfd',
        })
        $(this).find('.tip.hide').css({
            'color': '#fdfdfd',
        })
    }
)

$('tr').mouseout(
    function(){
        $(this).css({
            'background-color': 'whitesmoke',
        })
        $(this).find('.tip.hide').css({
            'color': 'whitesmoke',
        })        
    }
)



