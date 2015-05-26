<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
  <meta charset="UTF-8" />

  <title>Meme Creator</title>
  
  <link rel="stylesheet" href="style.css" />
  <link href='http://fonts.googleapis.com/css?family=Quando&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
  <script type="text/javascript" src="js/jquery.js"></script>
  <script src="js/canvas-toBlob.js"></script>
  <script src="js/script.js"></script>

</head>

<body>
  <div id="container">

    <div id="response"></div>
    <div id="image_editor">
      <div id="image_editable">
        <div id="text_container"></div>
        <canvas id="canvas_image" width="480" height="340"></canvas>
        <img src="temp_images/fry.jpg" id="image_source" style="display:none;" />
      </div>
    </div>


    <div id="text_edit_options">
      <button id="upload_btn" class="upload">Upload</button>
      <br />
      <span id="upload_loader" class="loader" style="display:none">Uploading...</span>
      <input type="file" style="display:none" id="image_upload"><br />
      <input type="checkbox" name="vehicle" class="bold" id="bld"> Bold
      <input type="checkbox" name="vehicle" class="italics" id="ita"> Italics
  
      <select name="font" class="fnt_chng" id="fnt_id">
      <option value="Arial">Arial</option>
      <option value="Comic Sans MS">Comic Sans MS</option>
      <option value="Courier New">Courier New</option>
      <option value="Georgia">Georgia</option>
      <option value="Impact">Impact</option>
      <option value="Tahoma">Tahoma</option>
      <option value="Times New Roman">Times New Roman</option>
      <option value="Verdana">Verdana</option>
      </select><br /><br />
      <input type="text" class="clr_chng" id="clr_id" placeholder="Enter Color code" />
      
      <div id="text_block_top"><br />
        <textarea placeholder="Type Your Quote Here" class="quote_text" name="top_text" id="top_text"  rows="4" cols="35"  >Type Your Quote Here</textarea>
        <div><br /><button class="font_control_top" data-id="plus">+</button><button class="font_control_top" data-id="minus">-</button>
        </div>
      </div>

      <div id="text_block_bottom">
        <br /><textarea placeholder="Type Your Quote Here" class="quote_text" name="bottom_text" id="bottom_text"  rows="4" cols="35" >Type Your Quote Here</textarea>
        <div><br /><button class="font_control_bottom" data-id="plus">+</button><button class="font_control_bottom" data-id="minus">-</button>
        </div>
      </div>

        <!--<select id="quote_font" name="quote_font" >
        <option value="Arial">Arial </option> 
        <option value="Times New Roman"> Times New Roman </option> 
        <option value="Quando">Quando</option> 
        </select> -->
        <br />
        <div><button id="save_meme" class="save">Save Meme</button></div>
        <br />
        <span id="saving_loader" class="loader" style="display:none">Saving...</span>
        <br />
        <span id="display_message"></span>
    </div>
  </div>

  <script>
    WebFontConfig = {
      google: { families: [ 'Quando' ] }
    };

    (function() {
      var wf = document.createElement('script');
      wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
      wf.type = 'text/javascript';
      wf.async = 'true';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(wf, s);
    })();
  </script>
</body>

</html>