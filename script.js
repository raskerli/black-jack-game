//arrays
var type = ["clubs", "diamonds", "hearts", "spades"];
var quantity = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];
//points
var dealerPoints = 0;
var playerPoints = 0;
//check for start
var started = false;
//count for dealer first move
var countDealer = 0;
//for checking is stand clicked
var standClicked = false;
//player
function nextSequencePlayer() {
  //random number
  var randomTypeNumberPlayer = Math.floor(Math.random() * 4);
  var randomQuantityNumberPlayer = Math.floor(Math.random() * 13);
  //generate image
  var cardImagePlayer =
    "./images/Playing Cards/PNG-cards-1.3/" +
    quantity[randomQuantityNumberPlayer] +
    "_of_" +
    type[randomTypeNumberPlayer] +
    ".png";

  $(".player .images").append('<img src="' + cardImagePlayer + '">');
  //check points
  switch (randomQuantityNumberPlayer) {
    case 0:
      playerPoints += 2;
      break;
    case 1:
      playerPoints += 3;
      break;
    case 2:
      playerPoints += 4;
      break;
    case 3:
      playerPoints += 5;
      break;
    case 4:
      playerPoints += 6;
      break;
    case 5:
      playerPoints += 7;
      break;
    case 6:
      playerPoints += 8;
      break;
    case 7:
      playerPoints += 9;
      break;
    case 8:
      playerPoints += 10;
      break;
    case 9:
      playerPoints += 10;
      break;
    case 10:
      playerPoints += 10;
      break;
    case 11:
      playerPoints += 10;
      break;
    case 12:
      playerPoints += 11;
      break;
  }
}
//dealer
function nextSequenceDealer() {
  //random number
  var randomQuantityNumberDealer = Math.floor(Math.random() * 13);
  var randomTypeNumberDealer = Math.floor(Math.random() * 4);
  //generate image

  var cardImageDealer =
    "./images/Playing Cards/PNG-cards-1.3/" +
    quantity[randomQuantityNumberDealer] +
    "_of_" +
    type[randomTypeNumberDealer] +
    ".png";
  if (countDealer == 0) {
    $(".dealler .images").append('<img src="' + cardImageDealer + '">');
    $(".dealler .images").append(
      '<img src="./images/Playing Cards/PNG-cards-1.3/back.png" class="start">'
    );
  } else {
    $(".dealler .images").append('<img src="' + cardImageDealer + '">');
  }
  //check points
  switch (randomQuantityNumberDealer) {
    case 0:
      dealerPoints += 2;
      break;
    case 1:
      dealerPoints += 3;
      break;
    case 2:
      dealerPoints += 4;
      break;
    case 3:
      dealerPoints += 5;
      break;
    case 4:
      dealerPoints += 6;
      break;
    case 5:
      dealerPoints += 7;
      break;
    case 6:
      dealerPoints += 8;
      break;
    case 7:
      dealerPoints += 9;
      break;
    case 8:
      dealerPoints += 10;
      break;
    case 9:
      dealerPoints += 10;
      break;
    case 10:
      dealerPoints += 10;
      break;
    case 11:
      dealerPoints += 10;
      break;
    case 12:
      dealerPoints += 11;
      break;
  }
  countDealer++;
}
//start the game
$(".deck").click(function () {
  if (!started) {
    $(".dealler .images").empty();
    $(".player .images").empty();
    nextSequencePlayer();
    nextSequencePlayer();
    nextSequenceDealer();
    $("h1").text("");
    started = true;
  }
});
//hit
$("#hit").click(function () {
  nextSequencePlayer();
  //check for lose from above 21
  if (playerPoints > 21) {
    $("h1").text("You lose click to the deck to restart");
    $(".start").remove();
    nextSequenceDealer();
    started = false;
    dealerPoints = 0;
    playerPoints = 0;
    countDealer = 0;
    standClicked = false;
  }
});
//stand
$("#stand").click(function () {
  standClicked = true;
  //check for direct win
  if (playerPoints == 21 && dealerPoints != 21) {
    $("h1").text("You Win click to the deck to restart");
    $(".start").remove();
    nextSequenceDealer();
    started = false;
    dealerPoints = 0;
    playerPoints = 0;
    countDealer = 0;
    standClicked = false;
  } //check for draw
  else if (playerPoints == 21 && dealerPoints == 21) {
    $("h1").text("Draw click to the deck to restart");
    $(".start").remove();
    nextSequenceDealer();
    started = false;
    dealerPoints = 0;
    playerPoints = 0;
    countDealer = 0;
    standClicked = false;
  }
  //check for normal game
  else {
    if (standClicked) {
      $(".start").remove();
      nextSequenceDealer();
      while (dealerPoints <= playerPoints && dealerPoints <= 17) {
        nextSequenceDealer();
      }
      if (dealerPoints > 21) {
        $("h1").text("You Win click to the deck to restart");
        started = false;
        dealerPoints = 0;
        playerPoints = 0;
        countDealer = 0;
        standClicked = false;
      } else if (dealerPoints == playerPoints) {
        $("h1").text("Draw click to the deck to restart");
        started = false;
        dealerPoints = 0;
        playerPoints = 0;
        countDealer = 0;
        standClicked = false;
      } else {
        $("h1").text("You Lose click to the deck to restart");
        started = false;
        dealerPoints = 0;
        playerPoints = 0;
        countDealer = 0;
        standClicked = false;
      }
    }
  }
});
