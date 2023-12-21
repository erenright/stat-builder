
//
// Cards
//

var cards = [];

function updateRemainingCards()
{
    var str = "";

    if (cards.length > 0)
    {
        cards.forEach((card) => {
            str += card + " ";
        });
    }
    else
    {
        str = "None!";
    }

    $("#remainingCards").html(str);
}

function resetCards()
{
    cards = [ 10, 8, 8, 8, 8, 7, 6, 5, 4, 4, 4, 2 ];

    updateRemainingCards();
    $("#cards tr:gt(0)").remove();
}

function drawCard()
{
    var idx, first, second;
    
    // Only if enough cards remain
    if (cards.length < 2)
    {
        alert("You don't have enough cards!");
        return;
    }

    // Pull two random cards, removing them from the list
    idx = Math.floor(Math.random() * cards.length);
    first = cards[idx];
    cards.splice(idx, 1);

    idx = Math.floor(Math.random() * cards.length);
    second = cards[idx];
    cards.splice(idx, 1);

    // Update remaining list
    updateRemainingCards();

    // Add result to table
    let row = $("<tr>");
    let cols = "<td>Result:</td>";    
    cols += "<td>" + first + " + " + second + " = " + (first + second) + "</td>";
    row.append(cols);
    $("#cards").append(row);
}

//
// Point Buy
//

var points = 0;
var pointBuyStats = [];

function pointBuy(index)
{
    // Input validation
    if (index >= pointBuyStats.length || index < 0)
    {
        return;
    }

    // Enough money?
    var cost = 0;
    var id = "#pb" + index;
    var want = parseInt($(id).html()) + 1;
    switch (want)
    {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            cost = 1;
            break;

        case 14:
        case 15:
            cost = 2;
            break;

        default:
            alert("Sorry, this is not an option.");
            return;
    }

    if (cost > points)
    {
        alert("You don't have enough points.");
        return;
    }
    
    // Purchase
    points -= cost;
    pointBuyStats[index] += 1;

    // Update UI
    updatePoints();
}

function pointSell(index)
{
    // Input validation
    if (index >= pointBuyStats.length || index < 0)
    {
        return;
    }

    // Determine cost
    var cost = 0;
    var id = "#pb" + index;
    var want = parseInt($(id).html());
    switch (want)
    {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
            cost = 1;
            break;

        case 14:
        case 15:
            cost = 2;
            break;

        default:
            alert("Sorry, this is not an option.");
            return;
    }

    // Purchase
    points += cost;
    pointBuyStats[index] -= 1;

    // Update UI
    updatePoints();
}

function resetPoints()
{
    points = 27;
    pointBuyStats = [ 8, 8, 8, 8, 8, 8 ];
}

function updatePoints()
{
    for (let i = 0; i < pointBuyStats.length; ++i)
    {
        var id = "#pb" + i;
        $(id).html(pointBuyStats[i]);
    }

    $("#pb").html(points);
}

//
// Common
//

$(document).ready(function ()
{
    resetCards();
    updateRemainingCards();

    resetPoints();
    updatePoints();
});

