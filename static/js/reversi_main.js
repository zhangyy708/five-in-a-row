$(document).ready(function() {

    // variables
    // adjustable

    
    // system --------------------------------------------------------------------------------------------------------------
    var player = 1; // initial player
    var direction = [-1, 1, -10, 10, -9, 9, -11, 11]; // directions
    var able_click = [0, 0]; // for calculating whether clickable button exists for both players
    var click_directions = new Array(); // store clickable direction index

    var button_true = document.getElementsByClassName('ele');
    var button_false = document.getElementsByClassName('ele_false');
    var button_id_true = new Array();
    var button_id_false = new Array();
    for (i = 0; i < button_true.length; i++) {
        button_id_true[i] = Number(button_true[i].getAttribute('id').slice(10)); // 10 - ele_button
    };
    for (i = 0; i < button_false.length; i++) {
        button_id_false[i] = Number(button_false[i].getAttribute('id').slice(10));
    };

    var language = 0; // which language (0 - English; 1 - 简体中文)
    var language_temp = 0; // do not change until press button
    var cpu = 0; // play local or cpu (0 - local; 1 - cpu)
    var cpu_temp = 0; // do not change until press button

    // initial display -----------------------------------------------------------------------------------------------------
    document.getElementById('welcome').style.display = 'block';
    document.getElementById('options').style.display = 'none';
    document.getElementById('rules').style.display = 'none';
    document.getElementById('game').style.display = 'none';
    document.getElementById('end').style.display = 'none';

    // welcome page initial display
    $('#title_welcome_cn').hide();
    $('#welcome_buttons_cn').hide();    

    // disable all buttons
    $('.ele').attr('disabled', true);
    $('.ele_false').attr('disabled', true);

    // button functions
    for (let k = 1; k <= 100; k++) {
        if (button_id_false.indexOf(k) == -1) { // buttons on the playground 
            
            $('#ele_button' + k).click(function() {
                click_results(k);
            });

        };
    };

    // process control buttons ---------------------------------------------------------------------------------------------
    // welcome to game
    $('#to_game_en').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        
        $('#title_game_en').show();
        $('#title_game_cn').hide();
        
        // start
        control();
    });

    $('#to_game_cn').click(function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        
        $('#title_game_en').hide();
        $('#title_game_cn').show();
        
        // start
        control();
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
        document.getElementById('welcome').style.display = 'block';
        document.getElementById('end').style.display = 'none';
        
        $('#title_welcome_en').show();
        $('#title_welcome_cn').hide();
    });

    $('#end_to_welcome_cn').click(function() {
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
    });


    // control -----------------------------------------------------------------------------------------------------------
    var control = function() {
        able_click[player - 1] = 0; // reset the current player clickable condition

        for (let k = 1; k <= 100; k++) {
            if (button_id_false.indexOf(k) == -1) { // buttons on the playground                

                if (direction_index(k)[0] >= 0) {
                    able_click[player - 1] = 1; // mark                    
                    $('#ele_button' + k).attr('disabled', false); // enable the button
                };

            };
        };

        if (able_click[player - 1] == 0) { // current player cannot click

            if (able_click[2 - player] == 0) { // the other player cannot click
                if (language == 0) {
                    $('#player').html('No place can be selected. Game set.');
                    $('#title_end_en').show();
                    $('#end_to_welcome_en').show();
                    $('#title_end_cn').hide();
                    $('#end_to_welcome_cn').hide();
                } else if (language == 1) {
                    $('#player').html('没有可以选择的格子。游戏结束。');
                    $('#title_end_cn').show();
                    $('#end_to_welcome_cn').show();
                    $('#title_end_en').hide();
                    $('#end_to_welcome_en').hide();
                };
                
                setTimeout(function() {
                    end();
                }, 1000);
            } else { // the other player can click
                if (language == 0) {
                    $('#player').html('No place can be selected. Change to player ' + (3 - player) + '.');
                } else if (language == 1) {
                    $('#player').html('没有可以选择的格子。变为玩家' + (3 - player) + '。');
                };

                player = 3 - player; // change player
                setTimeout(function() {
                    control();
                }, 1000); // continue to the other player
            };

        } else { // current player can click

            if (language == 0) {
                $('#player').html('Player ' + player + ' playing ... ');
            } else if (language == 1) {
                $('#player').html('玩家' + player + '选择中…');
            };
        };
        
    };

    // check if able to click --------------------------------------------------------------------------------------------
    var direction_index = function(button_id) {
        var direction_index = new Array();

        if ($('#ele_button' + button_id).html().indexOf('circle') > 0) { // already taken
            direction_index[0] = -1;
        } else {
            for (let i = 0; i < direction.length; i++){
                for (let j = 1; j < 10; j ++) {

                    // if over the border
                    if (button_id_false.indexOf(button_id + j * direction[i]) > 0) {
                        break;
                    };

                    // if no other-color piece
                    if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + (3 - player)) == -1) {

                        // if no this-color piece
                        if ($('#ele_button' + (button_id + j * direction[i])).html().indexOf('circle' + player) == -1) {
                            break;
                        } else { // if this-color piece

                            if (j > 1) { // if not next to the original piece
                                direction_index[direction_index.length] = i;
                                break;
                            } else { // if two next piece have the same color
                                break;
                            };

                        };
                    } else { // if other-color piece
                        continue;
                    };

                };
            };

            if (direction_index.length == 0) { // if unable to click (no this-color piece at the end)
                direction_index[0] = -1;
            };

        };

        return direction_index;
    };

    // click an enabled button -------------------------------------------------------------------------------------------
    var click_results = function(click_id) {
        click_directions = direction_index(click_id); // store clickable directions

        $('#ele_button' + click_id).html('<div class="circle' + player + '"></div>');
        
        for (let i = 0; i < click_directions.length; i++){
            for (let j = 1; j < 10; j ++) {
                
                // if no other-color piece
                if ($('#ele_button' + (click_id + j * direction[click_directions[i]])).html().indexOf('circle' + 
                    (3 - player)) == -1) {
                    break;
                } else { // if other-color piece
                    $('#ele_button' + (click_id + j * direction[click_directions[i]])).html('<div class="circle' + 
                        player + '"></div>');
                };

            };
        };

        // disable all buttons
        $('.ele').attr('disabled', true);

        // change player
        player = 3 - player;

        // next round
        control();

    };

    // end the game ------------------------------------------------------------------------------------------------------
    var end = function() {
        document.getElementById('welcome').style.display = 'none';
        document.getElementById('game').style.display = 'none';
        document.getElementById('end').style.display = 'block';

        var p1 = 0; // player 1's pieces
        var p2 = 0; // player 2's pieces

        for (let k = 1; k <= 100; k++) {
            if (button_id_false.indexOf(k) == -1) {
            
                if ($('#ele_button' + k).html().indexOf('circle1') >= 0) {
                    p1++;
                } else if ($('#ele_button' + k).html().indexOf('circle2') >= 0) {
                    p2++;
                };

                if (k == 45 || k == 56) {
                    $('#ele_button' + k).html('<div class="circle1"></div>');
                } else if (k == 46 || k == 55) {
                    $('#ele_button' + k).html('<div class="circle2"></div>');
                } else {
                    $('#ele_button' + k).html('');
                };
                
            };
        };

        if (language == 0) {
            $('#p1').html('<p>player 1</p><p>' + p1 + '</p>');
            $('#p2').html('<p>player 2</p><p>' + p2+ '</p>');
        } else if (language == 1) {
            $('#p1').html('<p>玩家1</p><p>' + p1 + '</p>');
            $('#p2').html('<p>玩家2</p><p>' + p2+ '</p>');
        };        

        if (p1 > p2) {
            if (language == 0) {                
                $('#who_wins').html('Player 1 wins!');
            } else if (language == 1) {
                $('#who_wins').html('玩家1胜利！');
            };
        } else if (p1 < p2) {
            if (language == 0) {
                $('#who_wins').html('Player 2 wins!');
            } else if (language == 1) {
                $('#who_wins').html('玩家2胜利！');
            };
        } else {
            if (language == 0) {
                $('#who_wins').html('Strike');
            } else if (language == 1) {
                $('#who_wins').html('平局');
            };
        };
        
        // initialise
        $('.ele').attr('disabled', true);
        $('.ele_false').attr('disabled', true);
        if (language == 0) {
            $('#player').html('Player 1 playing ...');
        } else if (language == 1) {
            $('#player').html('玩家1选择中…');
        };
        player = 1; // initial player
        able_click = [0, 0]; // for calculating whether clickable button exists for both players
        click_directions = new Array(); // store clickable direction index

    };
    

});







