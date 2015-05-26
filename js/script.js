  
$(document).ready(function(){

    var canvas = $('#canvas_image')[0];
    var ctx = canvas.getContext('2d');
    var image = document.getElementById('image_source');
    var image_loaded = false;
    var quote_input = $('#quote_font');
    var font_size_top = 40;
    var font_size_bottom = 40;
    var clr = "#fff";
    var frmtb = "";
    var frmti = "";
    var quote_font = "Arial";
    top_input = $('#top_text'),
    bottom_input = $('#bottom_text'),
    $('.quote_text').on('keyup',drawCanvas)
    $('#quote_font').on('change',drawCanvas)



    function drawCanvas(){
      if(image_loaded){;
        var maxh = 640,
        maxw = 480,
        height = image.height,
        width = image.width,
        top_text = top_input.val(),
        bottom_text = bottom_input.val(),
        pad_y_val = 12,
        pad_x_val = 12;
        while (height > maxh || width > maxw) {
          --height;
          --width;
        }
        canvas.height = height;
        canvas.width = width;
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0, width, height);
        ctx.font = frmtb+frmti+font_size_top+"px"+" "+quote_font;
        ctx.textAlign = "center";
        ctx.fillStyle = clr;
        ctx.strokeStyle ="#000";
        ctx.lineWidth = 0.1;
        top_lines = fragmentText(top_text, width - font_size_top - pad_x_val);
        top_lines.forEach(function(line, i) {
          ctx.fillText(line, width / 2, pad_y_val + ((i + 1) * font_size_top));
        });
        top_lines.forEach(function(line, i) {
          ctx.strokeText(line, width / 2, pad_y_val + ((i + 1) * font_size_top));
        });

        ctx.font = frmtb+frmti+font_size_bottom+"px"+" "+quote_font;

        bottom_lines = (fragmentText(bottom_text, width - font_size_bottom - pad_x_val)).reverse(); // reverse it for bottom up!
        bottom_lines.forEach(function(line, i) {
          ctx.fillText(line, width / 2, height - (pad_y_val + (i * font_size_bottom)));
        });
        bottom_lines.forEach(function(line, i) {
          ctx.strokeText(line, width / 2, height - (pad_y_val + (i * font_size_bottom)));
        });
      }else{

        $(image).on('load', function() {
          image_loaded=true;
          //console.log(image_loaded,'in')
          drawCanvas()
        });
      }
    }

    drawCanvas();

    $('#upload_btn').on('click',function(){
      $('#image_upload').trigger('click')
    })

    $('#image_upload').on('change',function(e){
        e.preventDefault();
        var file = this.files[0];
        var ext =  file.name.substring(file.name.lastIndexOf("."));
        $('#upload_loader').show();
        upload(file,ext,'temp_images','image',function(data){
            $('#image_source').attr('src',data.img_url)
            //drawCanvas();
            return;
        });
    })


    $('.font_control_top').on('click',function(){
        if($(this).attr('data-id')=='plus'){
          
          if(font_size_top<50)
            ++font_size_top;

        }else{

          if(font_size_top>30)
            --font_size_top;
        }
        drawCanvas();
    })

    $('.clr_chng').on('keyup', function(){
      clr = document.getElementById("clr_id").value;
      drawCanvas();
    })



    $('.italics').on('change', function(){
      if(!(document.getElementById("ita").checked)) {
        frmti = "";
      }
      else {
        frmti = "italic ";
      }
      drawCanvas();
    })

    

    $('.bold').on('change', function(){
      if(!(document.getElementById("bld").checked)) {
        frmtb = "";
      }
      else {
        frmtb = "bold ";
      }
      drawCanvas();
    })

    $('.fnt_chng').on('change', function(){
      var e = document.getElementById("fnt_id");
      quote_font = e.options[e.selectedIndex].value;
      drawCanvas();
    })


    $('.italics_click').on('click', function(){
      clr = "#000";
      drawCanvas();
    })

    
    $('.font_control_bottom').on('click',function(){
        if($(this).attr('data-id')=='plus'){
          
          if(font_size_bottom<50)
            ++font_size_bottom;

        }else{

          if(font_size_bottom>30)
            --font_size_bottom;
        }
        drawCanvas();
    })


    function upload(file, ext,path,type,callback){
      var formdata = new FormData();
      formdata.append('file',file)
      formdata.append('ext',ext)
      formdata.append('path',path)
      formdata.append('type',type)

      $.ajax({
        type: "POST",
        url: 'upload.php',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (data) {
            $('.loader').hide()
            var data = JSON.parse(data)
            callback(data)
        },
        error: function (data) {

        }
      });
    }

    function fragmentText(text, maxWidth) {
      var words = text.split(' '),
          lines = [],
          line = "";
      if (ctx.measureText(text).width < maxWidth) {
          return [text];
      }
      while (words.length > 0) {
          while (ctx.measureText(words[0]).width >= maxWidth) {
              var tmp = words[0];
              words[0] = tmp.slice(0, -1);
              if (words.length > 1) {
                  words[1] = tmp.slice(-1) + words[1];
              } else {
                  words.push(tmp.slice(-1));
              }
          }
          if (ctx.measureText(line + words[0]).width < maxWidth) {
              line += words.shift() + " ";
          } else {
              lines.push(line);
              line = "";
          }
          if (words.length === 0) {
              lines.push(line);
          }
      }
      return lines;
    }

    $('#save_meme').on('click',function(){
        canvas.toBlob(function(blob) {
        $('#saving_loader').show();
            upload(blob,'png','thumb','blob',function(data){
              var image_url = data.img_url;
              $('#display_message').text(image_url)
              alert('Meme Saved')
              console.log(image_url);
              //drawImage();
              $('.font_control_bottom').trigger('click')
            });
        })
    })

});

  