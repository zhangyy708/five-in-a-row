$(document).ready(function() {

    // variables
    // adjustable
    var board_size = 15; // the number of columns/rows on the board
    
    // system --------------------------------------------------------------------------------------------------------------    
    var language = 0; // which language (0 - English; 1 - 简体中文)
    var language_temp = 0; // do not change until press button
    var cpu = 0; // play local or cpu (0 - local; 1 - cpu)
    var cpu_temp = 0; // do not change until press button
    
    var player = 1; // initial player
    var directions = [-1, 1, -board_size, board_size, 1-board_size, board_size-1, -1-board_size, board_size+1]; // directions
    var button_id_temp = 0;
    var buttons_logic = new Array(); // store choices (not selected; player 1; player 2)
    for (let i=0; i<board_size**2; i++) buttons_logic[i]=0;
    var win = -1;
    
    var connected_check = 0; // check if same pieces
    var connected_number = new Array(); // number of pieces in each direction

    // initial display -----------------------------------------------------------------------------------------------------
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('end').style.display = 'none';

    // welcome page initial display
    $('#title_welcome_cn').hide();
    $('#welcome_buttons_cn').hide(); 

    // making the board
    for (let i = 0; i < board_size; i++){

        // horizontal lines
        $('#buttons').append('<div id="hori-line'+ i + '" class="hori-line"></div>');
        $('#hori-line'+i).css('margin-top', 29+60*i+'px');

        // vertical lines
        $('#buttons').append('<div id="vert-line'+ i + '" class="vert-line"></div>');
        if (i < (board_size-1)/2) {
            $('#vert-line'+i).css('margin-right', 812-120*i+'px');
        } else {
            $('#vert-line'+i).css('margin-left', 120*i-812+'px');
        };

    };

    // place holders for circles
    for (let i = 0; i < board_size; i++){
        
        $('#buttons').append('<div id="column' + i + '" class="column"></div>');
        
        for (let j = 0; j < board_size; j ++) {

            button_id_temp = i*(board_size)+j;
            $('#column'+i).append('<button id="ele_button' + button_id_temp + '" class="ele"></button>');

        };

    };

    
    // button functions
    for (let k = 0; k < board_size**2; k++) {
        
        // hover effect
        $('#ele_button'+k).mouseenter(function() {
            $('#ele_button'+k).append('<div class="circle' + player + '"></div>');
            $('#ele_button'+k+' .circle'+player).css('opacity', '0.5');
        });
        $('#ele_button'+k).mouseleave(function() {
            $('#ele_button'+k+' div').remove(' .circle'+player);
        });

        $('#ele_button'+k).click(function() {
            click_results(k);
        });

    };

    // process control buttons ---------------------------------------------------------------------------------------------
    // welcome to game
    $('#to_game_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        
        $('#title_game_en').show();
        $('#title_game_cn').hide();      
    });

    $('#to_game_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        
        $('#title_game_en').hide();
        $('#title_game_cn').show();
    });

    // welcome to options
    // default: local players
    $('#ai_off_cn').hide();
    $('#ai_off_en').show();
    $('#ai_off_en').text('Local players \u2713');
    $('#ai_off_en').css({
        'background-color': 'white',
        'color': '#2d2d2d'
    });

    $('#to_options_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('options').style.display = 'block';

        $('#title_options_en').show();
        $('#sub_options_en').show();
        $('#des_options_en').show();
        $('#options_to_welcome_en').show();
        $('#title_options_cn').hide();
        $('#sub_options_cn').hide();
        $('#des_options_cn').hide();
        $('#options_to_welcome_cn').hide();
        
        $('#ai_off_en').show();
        $('#ai_off_cn').hide();
        
        if (cpu === 0) {
            $('#ai_off_en').text('Local players \u2713');
            $('#ai_off_en').css({
                'background-color': 'white',
                'color': '#2d2d2d'
            });
        } else if (cpu === 1) {
            $('#ai_off_en').text('Local players');
            $('#ai_off_en').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    $('#to_options_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('options').style.display = 'block';

        $('#title_options_cn').show();
        $('#sub_options_cn').show();
        $('#des_options_cn').show();
        $('#options_to_welcome_cn').show();
        $('#title_options_en').hide();
        $('#sub_options_en').hide();
        $('#des_options_en').hide();
        $('#options_to_welcome_en').hide();
        
        $('#ai_off_cn').show();
        $('#ai_off_en').hide();
        
        if (cpu === 0) {
            $('#ai_off_cn').text('本地 \u2713');
            $('#ai_off_cn').css({
                'background-color': 'white',
                'color': '#2d2d2d'
            });
        } else if (cpu === 1) {
            $('#ai_off_cn').text('本地');
            $('#ai_off_cn').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    // options to welcome
    $('#options_to_welcome_en').click(function() {
        cpu = cpu_temp;
        language = language_temp;

        document.getElementById('welcome').style.display = 'block';
        document.getElementById('options').style.display = 'none';
        if (language === 0) {
            $('#title_welcome_cn').hide();
            $('#welcome_buttons_cn').hide();
            $('#title_welcome_en').show();
            $('#welcome_buttons_en').show();
        } else if (language === 1) {            
            $('#title_welcome_cn').show();
            $('#welcome_buttons_cn').show();
            $('#title_welcome_en').hide();
            $('#welcome_buttons_en').hide();
        };
    });

    $('#options_to_welcome_cn').click(function() {
        cpu = cpu_temp;
        language = language_temp;
        
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('options').style.display = 'none';
        if (language === 0) {            
            $('#title_cn').hide();
            $('#welcome_buttons_cn').hide();
            $('#title_en').show();
            $('#welcome_buttons_en').show();
        } else if (language === 1) {            
            $('#title_cn').show();
            $('#welcome_buttons_cn').show();
            $('#title_en').hide();
            $('#welcome_buttons_en').hide();
        };
    });

    // welcome to rules
    $('#to_rules_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('rules').style.display = 'block';

        $('#title_rules_en').show();
        $('#sub_rules_en').show();
        $('#ref_en').show();
        $('#rules_en').show();
        $('#rules_to_welcome_en').show();

        $('#title_rules_cn').hide();
        $('#sub_rules_cn').hide();
        $('#ref_cn').hide();
        $('#rules_cn').hide();
        $('#rules_to_welcome_cn').hide();
    });

    $('#to_rules_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('rules').style.display = 'block';

        $('#title_rules_cn').show();
        $('#sub_rules_cn').show();
        $('#ref_cn').show();
        $('#rules_cn').show();
        $('#rules_to_welcome_cn').show();

        $('#title_rules_en').hide();
        $('#sub_rules_en').hide();
        $('#ref_en').hide();
        $('#rules_en').hide();
        $('#rules_to_welcome_en').hide();
    });

    // rules to welcome
    $('#rules_to_welcome_en').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('rules').style.display = 'none';
        
        $('#title_welcome_cn').hide();
        $('#welcome_buttons_cn').hide();
        $('#title_welcome_en').show();
        $('#welcome_buttons_en').show();
    });

    $('#rules_to_welcome_cn').click(function() {
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('rules').style.display = 'none';
                  
        $('#title_welcome_cn').show();
        $('#welcome_buttons_cn').show();
        $('#title_welcome_en').hide();
        $('#welcome_buttons_en').hide();
    });

    // end to welcome
    $('#end_to_welcome_en').click(function() {
        console.log('pressed');
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
        
        $('#title_welcome_en').show();
        $('#title_welcome_cn').hide();
    });

    $('#end_to_welcome_cn').click(function() {
        console.log('pressed2');
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
        
        $('#title_welcome_en').hide();
        $('#title_welcome_cn').show();
    });

    // options --------------------------------------------------------------------------------------------------
    // if click on "vs CPU"
    $('#ai_on').click(function() {
        cpu_temp = 1;

        $('#ai_on').text('vs CPU \u2713');
        $('#ai_on').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        if (language === 0) {
            $('#ai_off_en').text('Local players');
            $('#ai_off_en').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        } else if (language === 1) {
            $('#ai_off_cn').text('本地');
            $('#ai_off_cn').css({
                'background-color': '#2d2d2d',
                'color': 'white'
            });
        };
    });

    // if click on "Local players"
    $('#ai_off_en').click(function() {
        cpu_temp = 0;

        $('#ai_on').text('vs CPU');
        $('#ai_on').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#ai_off_en').text('Local players \u2713');
        $('#ai_off_en').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
    });

    $('#ai_off_cn').click(function() {
        cpu_temp = 0;

        $('#ai_on').text('vs CPU');
        $('#ai_on').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#ai_off_cn').text('本地 \u2713');
        $('#ai_off_cn').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });
    });

    // default: English
    $('#en').text('English \u2713');
    $('#en').css({
        'background-color': 'white',
        'color': '#2d2d2d'
    });

    // if click on "简体中文"
    $('#cn').click(function() {
        language_temp = 1;

        $('#cn').text('简体中文 \u2713');
        $('#cn').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        $('#en').text('English');
        $('#en').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#player').html('玩家1选择中…');

    });

    // if click on "English"
    $('#en').click(function() {
        language_temp = 0;

        $('#cn').text('简体中文');
        $('#cn').css({
            'background-color': '#2d2d2d',
            'color': 'white'
        });

        $('#en').text('English \u2713');
        $('#en').css({
            'background-color': 'white',
            'color': '#2d2d2d'
        });

        $('#player').html('Player 1 playing ... ');
    });

    // click an enabled button -------------------------------------------------------------------------------------------
    var click_results = function(click_id) {

        // display
        $('#ele_button'+click_id).css({'cursor': 'default', 'opacity': '1'});
        $('#ele_button'+click_id+' .circle'+player).css('opacity', '1');
        $('#ele_button'+click_id).attr('disabled', 'true');

        // change logic
        buttons_logic[click_id] = player;


        // all places taken
        if (buttons_logic.indexOf(0) == -1) {

            if (language == 0) {
                $('#player').html('No place can be selected. Game over.\n(Click on the margin to continue)'); 
            } else {
                $('#player').html('没有可以下的位置。游戏结束。\n（点击空白以继续）');
            };

            win = 0; // nobody wins

            $('.ele').attr('disabled', 'true');
            $('.ele').css('cursor', 'default');

            setTimeout(function() {
                $('body').click(function() {
                    end();
                });
            }, 100);

        };

        // five-in-a-row
        connected_check = 0;
        for (let i=0; i<directions.length; i++) connected_number[i]=1;
        for (let i=0; i<directions.length; i++) { // count connected pieces in each direction
            for (let j=1; j<=5; j++) {

                connected_check = click_id+directions[i]*j;
                if (connected_check >= 0 && connected_check < board_size**2) { // on the board
                    if (buttons_logic[connected_check] == player) { // same pieces
                        connected_number[i]++;
                    } else {
                        break;
                    };
                };

            };
        };

        for (let i=0; i<directions.length/2; i++) {
            if (connected_number[i*2] + connected_number[i*2+1] - 1 >= 5) {

                if (language == 0) {
                    $('#player').html('Player '+ player +' wins!\n(Click on the margin to continue)');
                } else {
                    $('#player').html('玩家' + player + '胜利！\n（点击空白以继续）');
                };

                win = player; // player wins

                $('.ele').attr('disabled', 'true');
                $('.ele').css('cursor', 'default');

                
                setTimeout(function() {
                    $('body').click(function() {
                        end();
                    });
                }, 100);

                break;
            };

        };
  
        if (win == -1) {

            // change player
            player = 3 - player;

            // change display             
            if (language == 0) {
                $('#player').html('Player ' + player + ' playing ... ');
            } else {
                $('#player').html('玩家' + player + '选择中…');
            };

        };


    };

    // end the game ------------------------------------------------------------------------------------------------------
    var end = function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'block';

        $('body').unbind('click');

        if (language == 0) {
            $('#title_end_en').show();
            $('#title_end_cn').hide();
            $('#end_to_welcome_en').show();
            $('#end_to_welcome_cn').hide();
            if (win == 0) {
                $('#who_wins').html('Nobody wins. ');
            } else {
                $('#who_wins').html('Player '+ player +' wins!');
            };
        } else {
            $('#title_end_en').hide();
            $('#title_end_cn').show();
            $('#end_to_welcome_en').hide();
            $('#end_to_welcome_cn').show();
            if (win == 0) {
                $('#who_wins').html('平局。');
            } else {
                $('#who_wins').html('玩家' + player + '胜利！');
            };
        };

        // initialise
        $('.ele div').remove();
        $('.ele').attr('disabled', false);
        $('.ele').css('cursor', 'pointer');

        if (language == 0) {
            $('#player').html('Player 1 playing ...');
        } else if (language == 1) {
            $('#player').html('玩家1选择中…');
        };
        player = 1; // initial player

        for (let i=0; i<board_size**2; i++) buttons_logic[i]=0;
        win = -1;

    };
    

});







