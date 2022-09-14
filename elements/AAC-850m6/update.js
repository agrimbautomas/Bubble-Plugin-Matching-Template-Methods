function(instance, properties, context) {

    const RESPONSIVE_BREAK = 800;
var $searchBar;
var $itemsParent;
var $arrowBackChat;
var mobileApplied = false;

$(document).ready(function () {
    setupVars();
    setupSearchBar();
    setupArrowBackChat();
    setupResponsiveChat();
    responsiveRules();
});

isMobile = () => $(window).width() <= RESPONSIVE_BREAK;

function setupVars() {
    $searchBar = $('#' + properties.search_input_id);
    $itemsParent = $('#' + properties.items_parent_id)
    $arrowBackChat = $('#' + properties.arrow_back_id)
}


function setupSearchBar() {
    $searchBar.keyup(function () {
        let keywords = $searchBar.val();
        filterFields(keywords);

    });
}

function filterFields(keywords) {
    $itemsParent.find('.GroupItem').each(function () {
        let $titleElement = $(this).find("#" + properties.field_id)
        let title = $titleElement.html().toLowerCase();

        if (!title.includes(keywords.toLowerCase()) && keywords !== "")
            $(this).hide();
        else
            $(this).show()
    })
}

function setupArrowBackChat() {
    $('body').on("click", '#' + properties.arrow_back_id, function () {
        $('#chat-section-right').removeClass('active')
    })
}

function setupResponsiveChat() {
    $itemsParent.find('.GroupItem').click(function () {
        $('#chat-section-right').addClass('active')
    });
}


$(window).resize(responsiveRules);


function responsiveRules() {
    if (isMobile() && !mobileApplied)
        setStyles();
}

function setStyles() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "#chats-container{overflow-x: hidden !important;}" +
        "#chat-section-left { width: 100% !important; }" +
        "#chat-section-right{ position: absolute !important; width: 100% !important; height: 100% !important; z-index: 99 !important; right: -100% !important; transition: all 0.5s ease; } " +
        "#chat-section-right.active{ right: 0% !important; }" +
        "#" + properties.arrow_back_id + "{ cursor: pointer; }";
    document.getElementsByTagName('head')[0].appendChild(style);
    mobileApplied = true;
}
    
}