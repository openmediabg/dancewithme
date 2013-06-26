'use strict';

const heredoc = function(fn) {
  return ('' + fn).match(/[^]*\/\*([^]*)\*\/\}$/)[1];
};

const content = heredoc(function() {/*
  <!DOCTYPE html>
  <html>
    <head>
    <meta charset="utf-8">
    <style>
      body {
        background: #ecee00;
        font-family: sans-serif;
        font-size: 1em;
      }
      .main {
        width: 80%;
        min-height: 12em;
        margin: 5% auto;
        background: #fff;
        border-radius: 10px;
        border: 1px solid #000;
        padding: 4%;
        line-height: 140%;
        overflow: hidden;
      }
      .main h3 {
        margin-top: 0;
      }
      .logo {
        width: 20%;
        float: left;
        padding: 0 5% 5% 0;
      }
      .text {
        margin-left: 25%;
      }
      .text p {
        text-align: left;
      }
      .main ul {
        text-align: left;
      }
    </style>
    </head>
    <body>
      <div class="main">
        <img src="ignore.jpg" alt="" class="logo" />
        <div class="text">
          <h3>Внимание! Сайтът е част от групата на Делян Пеевски!</h3>
          <p>Материалът може да бъде:</p>
          <ul>
            <li>Необективен</li>
            <li>Съдържащ непроверени или неверни факти</li>
            <li>Без втора гледна точка</li>
            <li>Силно манипулативен</li>
          </ul>
          <p>Ако отворите страницата, подкрепяте некачествената журналистика.</p>
          <p>Импресия по импресия - медийна империя!</p>
          <p>
            <br />
            <input id="go_back" class="ignore" type="button" value="&#65513; #ignore" />
            <input id="force_continue" class="continue" type="button" value="все пак ще продължа &#65515;" />
          </p>
        </div>
      </div>
      <script type="text/javascript" src="init.js"></script>
    </body>
  </html>
*/});

document.body.innerHTML = content;
