$(document).ready(function() {

    function catchInform(name, email, phone, group) {
        $(".ct_name").text(name);
        $(".ct_email").text(email);
        $(".ct_phone").text(phone);
        $(".ct_group").text(group);
    }

    $(".ls_list").on("click", "li", function() {
        catchInform($(this).data("name"), 
                    $(this).data("email"), 
                    $(this).data("phone"), 
                    $(this).data("group"));

        $(".ls_list li").removeClass("active");
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }

        $(".btn_remove, .btn_edit").removeClass("hidden_content");
    });

    var formOverlay = $(".overley"),
        formAdd = $(".ls_form_add"),
        formEdit = $(".ls_form_edit"),
        formDelete = $(".ls_form_delete"),
        formNewGroup = $(".ls_form_add_group");

    $(".btn_add").on("click", function() {
        formAdd.toggleClass("is_visible");
        formEdit.removeClass("is_visible");
        formEdit[0].reset();
        formOverlay.show(700);
    });

    $(".btn_edit").on("click", function(){
        formEdit.toggleClass("is_visible");
        formAdd.removeClass("is_visible");
        formAdd[0].reset();
       formOverlay.show(700);

        var takeName = $(".active").data("name"), 
            takeEmail = $(".active").data("email"), 
            takePhone =  $(".active").data("phone"), 
            takeGroup = $(".active").data("group");

        $(".edit_name").attr({value: takeName});
        $(".edit_email").attr({value: takeEmail});
        $(".edit_phone").attr({value: takePhone});
        $(".edit_group").val(takeGroup);
    });

    $(".btn_remove").on("click", function(){
        formOverlay.show(700);
        formDelete.toggleClass('is_visible');
        var deleteContact = $(".active").data("name");
        $(".warn_q").text(deleteContact);
    });

    $(".overley").on("click", function() {
        formOverlay.hide(500);
        formAdd.removeClass("is_visible");
        formEdit.removeClass("is_visible");
        formDelete.removeClass("is_visible");
        formNewGroup.removeClass("is_visible");
        formAdd[0].reset();
        formEdit[0].reset();
    });

    $(".cancel_delete").on("click", function() {
        formOverlay.hide(500);
        formDelete.removeClass("is_visible");
    });

    $(".confirm_delete").on("click", function() {
        formOverlay.hide(500);
        $(".active").remove();
        catchInform('', '', '', '');
        formDelete.removeClass("is_visible");
        $(".btn_remove, .btn_edit").addClass("hidden_content");
    });

    $(".close_btn").on("click", function() {
        formOverlay.hide(500);
        formAdd.removeClass("is_visible");
        formEdit.removeClass("is_visible");
        formDelete.removeClass("is_visible");
        formNewGroup.removeClass("is_visible");
        formAdd[0].reset();
        formEdit[0].reset();
    });


    $(".form_create_btn").on("click", function() {
        var pullName = $(".add_name").val().trim(),
            pullEmail = $(".add_email").val(),
            pullPhone = $(".add_phone").val(),
            pullGroup = $(".add_group").val();

        if (pullName != '') {
            $(".ls_list").prepend(  '<li    data-name="' + pullName 
                                        +'" data-email="' + pullEmail 
                                        +'" data-phone="' + pullPhone 
                                        +'" data-group="' + pullGroup 
                                        +'">'
                                        + pullName
                                    +'<i class="fa fa-exchange transfer" aria-hidden="true"></i></li>');
            formAdd.removeClass("is_visible");
            formOverlay.hide(500);
            formAdd[0].reset();
        } else {
            alert("Please, enter the name of your contact!");
        }
    });

    $(".form_confirm_btn").on("click", function() {
        var changeName = $(".edit_name").val(), 
            changeEmail = $(".edit_email").val(), 
            changePhone =  $(".edit_phone").val(), 
            changeGroup = $(".edit_group").val();

        catchInform(changeName, changeEmail, changePhone, changeGroup);
        $(".active").data("name", changeName); 
        $(".active").data("email", changeEmail); 
        $(".active").data("phone", changePhone); 
        $(".active").data("group", changeGroup);

        $(".active").text(changeName);

        formEdit.removeClass("is_visible");
        formOverlay.hide(500);
        formEdit[0].reset();
    });

    $(".add_newgroup").on("click", function() {
        formOverlay.show(800);
        formNewGroup.toggleClass("is_visible");
    });

    $(".confirm_add_newgroup").on("click", function() {
        var pullGroupName = $(".push_group").val().trim();
        if (pullGroupName != '') {
            $(".group_list").append('<li class="dropdown-item" href="#">' + pullGroupName + '</li>');
            $(".edit_group").append('<option>' + pullGroupName + '</option>');
            $(".add_group").append('<option>' + pullGroupName + '</option>');
            formNewGroup.removeClass("is_visible");
            formOverlay.hide(500);
            formNewGroup[0].reset();
        } else {
            alert("Please, enter the name of your group!");
        }
    });

    function setGroupName(groupName) {
        $("#myUL li").each(function() {
            if (groupName === "All contacts") {
                $(this).show();
            }
            else 
                if ($(this).data("group").indexOf(groupName) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
        });   
    }

    function searchContact(contact) {
        var takeGroup = $(".group_name").text();
        
        $("#myUL li").each(function() {
            if ((takeGroup === "All contacts") && ($(this).text().toUpperCase().indexOf(contact) > -1)) {
                $(this).show();
            } else 
                if ((takeGroup === $(this).data("group")) && ($(this).text().toUpperCase().indexOf(contact) > -1)) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
        });
    }

    $(".group_list").on("click", "li", function() {
        NameOfGroup = $(this).text();
       $(".group_name").text(NameOfGroup);
        
        setGroupName(NameOfGroup); 
    });

    $("#searchContact").keyup(function() {
        typingData = $(this).val().toUpperCase().trim();

        searchContact(typingData);
    });

});
