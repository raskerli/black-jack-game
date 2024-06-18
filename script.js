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
//shufled deck
var deck = [];
var cntForDeck = 0;
//check for hit
var hitCheck = 0;
//card shufle

function shufleDeck() {
  for (var i = 0; i < type.length; i++) {
    for (let j = 0; j < quantity.length; j++) {
      deck.push(quantity[j] + "_of_" + type[i]);
    }
  }
  for (var k = 0; k < deck.length; k++) {
    var random = Math.floor(Math.random() * deck.length);
    var temp = deck[k];
    deck[k] = deck[random];
    deck[random] = temp;
  }
}

//player
function nextSequencePlayer() {
  //generate image
  var cardImagePlayer =
    "./images/Playing Cards/PNG-cards-1.3/" + deck[cntForDeck] + ".png";

  $(".player .images").append('<img src="' + cardImagePlayer + '">');
  //check points
  var value1 = deck[cntForDeck].split("_of_")[0];
  switch (value1) {
    case "2":
      playerPoints += 2;
      break;
    case "3":
      playerPoints += 3;
      break;
    case "4":
      playerPoints += 4;
      break;
    case "5":
      playerPoints += 5;
      break;
    case "6":
      playerPoints += 6;
      break;
    case "7":
      playerPoints += 7;
      break;
    case "8":
      playerPoints += 8;
      break;
    case "9":
      playerPoints += 9;
      break;
    case "10":
      playerPoints += 10;
      break;
    case "jack":
      playerPoints += 10;
      break;
    case "queen":
      playerPoints += 10;
      break;
    case "king":
      playerPoints += 10;
      break;
    case "ace":
      playerPoints += 11;
      break;
  }
  cntForDeck++;
}
//dealer
function nextSequenceDealer() {
  //generate image

  var cardImageDealer =
    "./images/Playing Cards/PNG-cards-1.3/" + deck[cntForDeck] + ".png";
  if (countDealer == 0) {
    $(".dealler .images").append('<img src="' + cardImageDealer + '">');
    $(".dealler .images").append(
      '<img src="./images/Playing Cards/PNG-cards-1.3/back.png" class="start">'
    );
  } else {
    $(".dealler .images").append('<img src="' + cardImageDealer + '">');
  }
  //check points
  var value2 = deck[cntForDeck].split("_of_")[0];
  switch (value2) {
    case "2":
      dealerPoints += 2;
      break;
    case "3":
      dealerPoints += 3;
      break;
    case "4":
      dealerPoints += 4;
      break;
    case "5":
      dealerPoints += 5;
      break;
    case "6":
      dealerPoints += 6;
      break;
    case "7":
      dealerPoints += 7;
      break;
    case "8":
      dealerPoints += 8;
      break;
    case "9":
      dealerPoints += 9;
      break;
    case "10":
      dealerPoints += 10;
      break;
    case "jack":
      dealerPoints += 10;
      break;
    case "queen":
      dealerPoints += 10;
      break;
    case "king":
      dealerPoints += 10;
      break;
    case "ace":
      dealerPoints += 11;
      break;
  }
  countDealer++;
  cntForDeck++;
}
//start the game
$(".deck").click(function () {
  if (!started) {
    $(".dealler .images").empty();
    $(".player .images").empty();
    shufleDeck();
    nextSequencePlayer();
    nextSequencePlayer();
    nextSequenceDealer();
    $("h1").text("");
    started = true;
  }
});
//hit
$("#hit").click(function () {
  if (started) {
    nextSequencePlayer();
    //check for lose from above 21
    if (playerPoints > 21) {
      $("h1").text("You Lose click to the deck to restart");
      $(".start").remove();
      nextSequenceDealer();
      startOver();
      playSound("lose");
    }
  }
  hitCheck++;
});
//stand
$("#stand").click(function () {
  if (started) {
    standClicked = true;
    //check for direct win
    if (playerPoints == 21 && dealerPoints != 21 && hitCheck == 0) {
      $("h1").text("You Win click to the deck to restart");
      $(".start").remove();
      nextSequenceDealer();
      startOver();
      playSound("win");
    } //check for draw
    else if (playerPoints == 21 && dealerPoints == 21) {
      $("h1").text("Draw click to the deck to restart");
      $(".start").remove();
      nextSequenceDealer();
      startOver();
      playSound("win");
    }
    //check for normal game
    else {
      if (standClicked) {
        $(".start").remove();
        nextSequenceDealer();
        while (dealerPoints <= playerPoints && dealerPoints <= 16) {
          nextSequenceDealer();
        }
        if (dealerPoints > 21) {
          $("h1").text("You Win click to the deck to restart");
          startOver();
          playSound("win");
        } else if (dealerPoints == playerPoints) {
          $("h1").text("Draw click to the deck to restart");
          startOver();
          playSound("win");
        } else if (dealerPoints < playerPoints) {
          $("h1").text("You Win click to the deck to restart");
          startOver();
          playSound("win");
        } else {
          $("h1").text("You Lose click to the deck to restart");
          startOver();
          playSound("lose");
        }
      }
    }
  }
});
function startOver() {
  started = false;
  dealerPoints = 0;
  playerPoints = 0;
  countDealer = 0;
  standClicked = false;
  hitCheck = 0;
  cntForDeck = 0;
}
function playSound(name) {
  var audio = new Audio("audio/" + name + ".mp3");
  audio.play();
}
