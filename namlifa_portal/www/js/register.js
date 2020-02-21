$(document).ready(function() {
    // var elems = document.querySelectorAll('.datepicker');
    // var instances = M.Datepicker.init(elems, {format: 'dd/mm/yyyy'});
    // var agent_date = document.querySelectorAll('#date_contracted_as_agent');
    // var agent_date_instance = M.Datepicker.init(agent_date, {format: 'mm/yyyy'});
    var signatures = {};
    var photo;

    loadSignPad();

    var validation = {
        new_nric_no: function (val) {
            var match,
                dob = '';

            if (/\d{6}-\d{2}-\d{4}/.test(val)) {
                match = val.slice(0, 6).match(/.{2}/g).reverse();
                dob = match[0] + '/' + match[1] + '/' + (parseInt(match[2]) > 40 ? '19' + match[2] : '20' + match[2]); // limitation: can handle up to 2040 only
                $('#date_of_birth').val(dob);
                return true;
            }
            else { return 'Invalid value for NRIC number' }
        },
        full_name: function (val) {
          if (val !== '') {
              $('#card_owner_name').val(val);
              $('#renewal_name').val(val);
              return true;
          }
          else { return 'Name cannot be empty'}
        },
        company: function (val) {
           if (val !== '') {
               $('#renewal_company').val(val);
               return true;
           }
           else { return 'Name cannot be empty'}
       },
        tel_hp: function (val) {
            if (/60\d{9,}/.test(val)) {
                return true;
            }
            else { return 'Invalid value for Mobile number' }
        },
        tel_o: function (val) {
            if (/60\d{9,}/.test(val)) {
                return true;
            }
            else { return 'Invalid value for Office number' }
        },
        tel_h: function (val) {
            if (/60\d{9,}/.test(val)) {
                return true;
            }
            else { return 'Invalid value for House number' }
        },
        tel_fax: function (val) {
            if (/60\d{9,}/.test(val)) {
                return true;
            }
            else { return 'Invalid value for Fax number' }
        },
        email: function (val) {
            if (/.+@.+\..+/.test(val)) {
                return true;
            }
            else { return 'Invalid value for email' }
        },
    };

	$('body').focusout(function (evt) {
		var $input = $(evt.target),
			field = $input.attr('name'),
			valid;

		if (validation[field]) {
			valid = validation[field]($input.val(), $input);
			if (valid !== true) {
				frappe.msgprint(valid);
				$input.closest('.form-group').addClass('invalid');
			}
		}
    });

    $("#submitApplication").on("click", function(e) {
        var $invalid = $('.invalid'),
            errLine,
            data = {},
            elements,
            res;


        e.preventDefault();
        if ($invalid.length) {
            errLine = "<p>There are atleast "+ $invalid.length +" error(s) on the page. Look out for red fields.</p>";

            window.erpx.showError(errLine);
        }
        else if (Object.keys(signatures).length !== 2) {
            errLine = "<p>Plese sign on signature fields</p>";

            window.erpx.showError(errLine);
        }
        else {
            elements = [].slice.call(document.forms[0].elements);
            data = packingFunction(data, elements);
            data['photo'] = photo;
            data['terms_signature'] = signatures['terms_signature'];
            data['payment_signature'] = signatures['payment_signature'];

            res = window.erpx.call_method("namlifa_portal.namlifa_members.doctype.namlifa_member.member_registration",'Namlifa Member', data);

            console.log(res);
        }
        // e.preventDefault();
        // window.location.href = 'payment';
        // if ($invalid.length > 0 ) {
        //     e.preventDefault();
        //
        // }
        // else {
        //     window.location.href = 'payment';
        // }
        // e.preventDefault();
        // var invalidData = document.querySelectorAll('.invalid')
        // console.log(invalidData);
        // if (invalidData.length > 0) {
        //     var errLine = "<p>There are atleast "+invalidData.length+" error(s) on the page. Look out for red fields.</p>";
        //     window.erpx.showError(errLine);
        //     return false;
        // }
        //
        // var data = {};
        // var elements = [].slice.call(document.forms[0].elements);
        // data = packingFunction(data, elements);
        // data['photo'] = window.photoFile;
        // data['signature'] = window.signFile;
        // var res = window.erpx.call_method("erpx_namlifa.erpx_for_namlifa.erpx_utilities.create_member_application",'Member Registration', data);
        // return res
    });

    $("#photo").on("change", function() {
        previewFileURL(this, "#photoPreview");
    });

    // $(document).on("keyup", ".cnf", function() {
    //     var strval = this.value;
    //     if(strval === "603") {
    //         this.value = "603-";
    //     } else if(strval === "6021") {
    //         this.value = "6021-";
    //     }
    // });
    //
    // $("#new_nric_no").on("keyup", function() {
    //     //XXXXXX-XX-XXXX
    //     var strval = this.value;
    //     if (strval.length == 6 || strval.length == 9) {
    //         this.value = strval+"-";
    //     }
    // });
    //
    // $("#new_nric_no").on("change", function() {
    //     var strval = this.value;
    //     if (strval.length == 12) {
    //         this.value = strval.substr(0, 7) + "-" + strval.substr(7, 9) + "-" + strval.substr(9);
    //     }
    // });

    function loadSignPad() {
        setTimeout(() => {
            signPadLoaded = true;
            $(".signature-widget").empty();
            $(".signature-widget").jSignature().bind('change', function(e){
                var $target = $(e.target),
                    base64_img = $target.jSignature("getData"),
                    id = $target.attr('id'),
                    signFile = dataURLtoFile(base64_img, id + '.png');

                signatures[id] = {
                    img: base64_img
                };
            });

            $(".reset-signature").on("click", function(e){
                var $target = $(e.target),
                    id = $target.attr('id');

                $target.parent('p').next('.signature-widget').jSignature('reset');
                delete signatures[id];
                //$("#signatureWidget").jSignature("reset");
            });
        }, 200);
    }

    function previewFileURL(input, imgId) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {
                var file = dataURLtoFile(e.target.result, 'photo_image');

                console.log(e);

                $(imgId).attr('src', e.target.result);
                photo = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
});

function dataURLtoFile(dataurl, filename) {
    try{
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }catch(error){
      try{
        var blobObject = new Blob([u8arr], {type: 'mime'});
        return "";
      }catch(error){
        return "";
      }
    }
}

const packingFunction = (data, elements) => {
    elements.map(function(x){
        if(x.name) data[x.name] = x.value;
    });
    return data;
};