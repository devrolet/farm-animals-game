
// this game will only have one state
var GameState = {
  // load the game assets before the game starts
  preload: function() {
    // Load Background
    this.load.image('background', 'assets/images/background.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    // this.load.image('horse', 'assets/images/horse.png');
    // this.load.image('pig', 'assets/images/pig.png');
    // this.load.image('sheep', 'assets/images/sheep3.png');
  },
  // executed after everything is loaded
  create: function() {
    // Scale to fix entire screen
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Center the game
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    // create a new sprite
    this.background = this.game.add.sprite(0, 0, 'background');

    // Set Center of World
    this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
    // place sprite by it's center, not the top-left corner
    this.chicken.anchor.setTo(0.5);

    // left arrow allow user input
    this.chicken.inputEnabled = true;
    this.chicken.input.pixelPerfectClick = true;
    this.chicken.events.onInputDown.add(this.animateAnimal, this);

    // left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: 1};

    // left arrow allow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    // right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    // left arrow allow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    // this.chicken.scale.setTo(2,1);

    // this.horse = this.game.add.sprite(120, 10, 'horse');
    // this.horse.scale.setTo(0.5);

    // this.pig = this.game.add.sprite(500, 300, 'pig');
    // // Flip image
    // this.pig.anchor.setTo(0.5);
    // // Negative numbers flip image (flip on x, flip on y)
    // this.pig.scale.setTo(-1, 1);


    // this.sheep = this.game.add.sprite(100, 250, 'sheep');
    // this.sheep.scale.setTo(0.5);
    // // rotate image on it's axis
    // this.sheep.anchor.setTo(0.5);
    // // rotate the image
    // this.sheep.angle = -45;

  },
  // this is executed multiple times per second
  update: function() {
    // constant rotate using the update method
    // this.sheep.angle += 0.5;
  },
  switchAnimal: function (sprite, event) {
    console.log('move animal');
  },
  animateAnimal: function(sprite, event) {
    console.log('animate animal');
  }
};

// initiates the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
// Start Game
game.state.start('GameState');