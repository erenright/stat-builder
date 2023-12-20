var cards = [ 10, 8, 8, 7, 6, 6, 6, 5, 4, 4, 4, 2 ];

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
    $("#cards").append(row);}

$(document).ready(function ()
{
    updateRemainingCards();
});