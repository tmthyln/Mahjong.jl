var documenterSearchIndex = {"docs":
[{"location":"dealing/#Dealing-the-Hands","page":"Dealing the Hands","title":"Dealing the Hands","text":"","category":"section"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"Having built the wall, next is the dealing of the hands.","category":"page"},{"location":"dealing/#Distributing-tiles-to-player-hands","page":"Dealing the Hands","title":"Distributing tiles to player hands","text":"","category":"section"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"Starting from the east seat,  sets of 4 tiles are distributed to each seat, and then single tiles are distributed. The east seat gets one extra tile to start (effectively, they're just starting their turn early).","category":"page"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"Depending on the style of Mahjong,  there are different numbers of sets of tiles distributed. For example, in 13-tile variants, all seats get 3 sets of 4 tiles and then 1 set of 1 tile.","category":"page"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"using MahjongTiles: TilePile, deal_tiles\nusing Random\n\ndeck = TilePile(:standard)\nshuffle!(deck)\n\nhands = deal_tiles(deck, quadruple_rounds=3, single_rounds=1)  # default","category":"page"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"In 16-tile variants, all seats get 4 sets of 4 tiles and no sets of 1 tile.","category":"page"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"deck = TilePile(:standard)\nshuffle!(deck)\n\nhands16 = deal_tiles(deck, quadruple_rounds=4, single_rounds=0)","category":"page"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"Note how the first hand (the one for the east hand) has an extra tile to start.","category":"page"},{"location":"dealing/#Replacing-flowers","page":"Dealing the Hands","title":"Replacing flowers","text":"","category":"section"},{"location":"dealing/","page":"Dealing the Hands","title":"Dealing the Hands","text":"When playing with flowers,  flowers for all players are replaced at the beginning of each game before the first tile is thrown out.","category":"page"},{"location":"scoring/#Scoring-Hands","page":"Scoring Hands","title":"Scoring Hands","text":"","category":"section"},{"location":"scoring/","page":"Scoring Hands","title":"Scoring Hands","text":"Now that someone has won (or claimed to have won), we need to \"score\" two parts:","category":"page"},{"location":"scoring/","page":"Scoring Hands","title":"Scoring Hands","text":"determine whether they've actually won; this is just checking that their hand \"works\"\nif counting points, determine the number of points they have and whether they've reached the win threshold of points","category":"page"},{"location":"scoring/","page":"Scoring Hands","title":"Scoring Hands","text":"It turns out, this is not that straightforward,  because we need to search through all possible ways to arrange the tiles in a valid way. In general, we also want to combine this with the scoring so that we find the arrangement with the highest point score, and rules can be complex.","category":"page"},{"location":"building_wall/#Building-the-Wall","page":"Building the Wall","title":"Building the Wall","text":"","category":"section"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"The first step before the game can be played is that the four \"walls\" need to be built. Physically, this involves shuffling the deck and stacking the tiles into four rows of a certain length and 2 tiles tall.","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"In code, this is broken up into a few steps:","category":"page"},{"location":"building_wall/#Determine-the-size-of-the-deck","page":"Building the Wall","title":"Determine the size of the deck","text":"","category":"section"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"Depending on the variation, some of the \"suits\" are excluded.  In the standard variation, there are the following tile quantities:","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"Suit Examples Quantity of Each Tile\nCharacter 🀉🀍🀏 4 per number\nBamboo 🀐🀑🀗 4 per number\nCircle 🀙🀝🀟 4 per number\nWinds 🀀🀁🀂🀃 4 of each\nDragons 🀄🀅🀆 4 of each\nFlowers/Seasons 🀢🀤🀦🀩 1 of each","category":"page"},{"location":"building_wall/#Create-and-shuffle-the-deck","page":"Building the Wall","title":"Create and shuffle the deck","text":"","category":"section"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"For the standard deck, there's a single argument constructor that automatically creates a deck with the correct number of tiles.","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"using MahjongTiles: TilePile\n\ndeck = TilePile(:standard)","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"Then, we shuffle the deck.","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"using Random\n\nshuffle!(deck)","category":"page"},{"location":"building_wall/","page":"Building the Wall","title":"Building the Wall","text":"In a physical game of Mahjong,  dice are rolled to determine where to start distributing tiles. However, this is mostly an anti-cheat measure. We could roll some dice and then use circshift to adjust the deck, but that's mostly for show (or in a GUI implementation).","category":"page"},{"location":"decks/#Decks-(TilePiles)","page":"Decks/TilePiles","title":"Decks (TilePiles)","text":"","category":"section"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"Tiles can also be collected into an abstract idea of a \"pile of tiles.\" For example, this is intended to be used to represent the four walls of tiles in the game. Decks (called TilePiles in code) have several properties:","category":"page"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"Ordered\nSize strictly decreases\nRemoval occurs strictly at the two ends of the pile","category":"page"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"In this way, a TilePile is like a deque that can only be removed from once it's been created.","category":"page"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"MahjongTiles.TilePile\nMahjongTiles.TilePile(::Symbol)","category":"page"},{"location":"decks/#MahjongTiles.TilePile","page":"Decks/TilePiles","title":"MahjongTiles.TilePile","text":"A pile of tiles.  An abstraction for a collection of Mahjong tiles, similar to a deque.\n\nSome properties:\n\nordered and unsorted\nsize only strictly decreases once created\n\n\n\n\n\n","category":"type"},{"location":"decks/#MahjongTiles.TilePile-Tuple{Symbol}","page":"Decks/TilePiles","title":"MahjongTiles.TilePile","text":"TilePile(tiles)\nTilePile(name)\n\nCreate a particular predefined/standard TilePile given the name, or create the TilePile from a specific list of tiles.\n\nSupported Names\n\n:standard\n\n4 of each numbered tile from the 3 suits, plus 4 of each wind, 4 of each dragon, and the 8 flowers/seasons\n\n\n\n\n\n","category":"method"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"TilePiles support a limited set of operations that reflect allowable actions in the game, e.g. shuffling tiles, circshift for determining where the ends of the pile are.","category":"page"},{"location":"decks/#Removing-from-a-TilePile","page":"Decks/TilePiles","title":"Removing from a TilePile","text":"","category":"section"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"Base.pop!(::MahjongTiles.TilePile)\nBase.pop!(::MahjongTiles.TilePile, ::Integer)\nBase.popfirst!(::MahjongTiles.TilePile)\nBase.popfirst!(::MahjongTiles.TilePile, ::Integer)","category":"page"},{"location":"decks/#Base.pop!-Tuple{MahjongTiles.TilePile}","page":"Decks/TilePiles","title":"Base.pop!","text":"pop!(tilepile)\n\nRemove a tile from the end of the tile pile. Removing from this end is used for the usual pickup of tiles from the deck (not for flower/four-of-a-kind replacement).\n\n\n\n\n\n","category":"method"},{"location":"decks/#Base.pop!-Tuple{MahjongTiles.TilePile,Integer}","page":"Decks/TilePiles","title":"Base.pop!","text":"pop!(tilepile, num_tiles)\n\nRemove num_tiles tiles from the end of the tile pile as an array. Removing from this end is used for the usual pickup of tiles from the deck (not for flower/four-of-a-kind replacement).\n\n\n\n\n\n","category":"method"},{"location":"decks/#Base.popfirst!-Tuple{MahjongTiles.TilePile}","page":"Decks/TilePiles","title":"Base.popfirst!","text":"popfirst!(tilepile)\n\nRemove the \"first\" tile from the tile pile. Removing from this end is intended to be used for flower/four-of-a-kind replacement (this is to improve average performance).\n\n\n\n\n\n","category":"method"},{"location":"decks/#Base.popfirst!-Tuple{MahjongTiles.TilePile,Integer}","page":"Decks/TilePiles","title":"Base.popfirst!","text":"popfirst!(tilepile, num_tiles)\n\nRemove the \"first\" num_tiles tiles from the tile pile as an array. Removing from this end is intended to be used for flower/four-of-a-kind replacement (this is to improve average performance).\n\n\n\n\n\n","category":"method"},{"location":"decks/#Other-Operations","page":"Decks/TilePiles","title":"Other Operations","text":"","category":"section"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"These are other functions supported for the TilePile type, but since they behave the same as in Julia Base, they aren't further documented.","category":"page"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"length\nfirst\nlast\ncircshift\nshuffle!","category":"page"},{"location":"decks/","page":"Decks/TilePiles","title":"Decks/TilePiles","text":"warning: Warning\nBecause circshift does not modify the TilePile,  there is a plan to implement a mutating circshift!, which will deprecate circshift.","category":"page"},{"location":"tiles/#Tile-API","page":"Tiles","title":"Tile API","text":"","category":"section"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"Tiles are sorted in \"suits\" or \"pseudo-suits.\"  Generally speaking, the usual \"suited tiles\" belong to the character, bamboo, or circle suits. The other tiles are not really in suits,  but they can be treated programmatically as if they were. The normal suits are considered sequential suits;  the other suits are considered non-sequential suits.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"using MahjongTiles","category":"page"},{"location":"tiles/#Suits","page":"Tiles","title":"Suits","text":"","category":"section"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"info: Info\nThis is a more internal implementation detail and is subject to change in future versions.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"This is the current way that suits are implemented. All suit types inherit from a single abstract type","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"MahjongTiles.Suit","category":"page"},{"location":"tiles/#MahjongTiles.Suit","page":"Tiles","title":"MahjongTiles.Suit","text":"The root abstract type for suit types.  This is also used to represent \"pseudo-suit\" types, like the winds, dragons, flowers, etc.\n\n\n\n\n\n","category":"type"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"which has the following interface:","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"Function Default Description\nis_sequential(suit_type) false Whether this suit can be scored sequentially\nmax_number(suit_type) 1 The max number that this suit has\nfirst_char(suit_type) - The Unicode character associated with the number 1 (required)\ntypical_duplication(suit_type) 1 The typical number of tiles included in a deck with each tile in this suit","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"Note that the first_char method is required for printing,  and if a new suit has max_number(suit_type) > 1,  it is assumed that they are consecutive in Unicode.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"The way that these are currently implemented,  each suit type is another abstract type that inherits from Suit. The required methods operate on the type and not instances of the type.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"MahjongTiles.is_sequential\nMahjongTiles.max_number\nMahjongTiles.first_char\nMahjongTiles.typical_duplication","category":"page"},{"location":"tiles/#MahjongTiles.is_sequential","page":"Tiles","title":"MahjongTiles.is_sequential","text":"is_sequential(suit_type)\n\nCheck whether this suit type (or pseudo-suit) is a sequential one (for the purposes of hands). For example, typically the characters suit is sequential, but the winds suit is not.\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.max_number","page":"Tiles","title":"MahjongTiles.max_number","text":"max_number(suit_type)\n\nThe maximum (\"index\") number for this suit type (or pseudo-suit). For example, the traditional suited tiles (characters, bamboo, circle) have a max of 9 (starting at 1),  whereas the winds pseudo-suit has a max of 4.\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.first_char","page":"Tiles","title":"MahjongTiles.first_char","text":"first_char(suit_type)\n\nThe character for the first tile in this suit (in Unicode).\n\nExamples\n\njulia> first_char(Character)\n🀇\n\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.typical_duplication","page":"Tiles","title":"MahjongTiles.typical_duplication","text":"typical_duplication(suit_type)\n\nThe number of duplicate tiles usually used for this suit type (this is usually 1 or 4).\n\n\n\n\n\n","category":"function"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"There are also 2 additional constants that list all of the implemented suits.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"MahjongTiles.suits\nMahjongTiles.all_suits","category":"page"},{"location":"tiles/#MahjongTiles.suits","page":"Tiles","title":"MahjongTiles.suits","text":"List of the \"normal\" suits: character, bamboo, circles.\n\nusing MahjongTiles\n\nMahjongTiles.suits\n\n\n\n\n\n","category":"constant"},{"location":"tiles/#MahjongTiles.all_suits","page":"Tiles","title":"MahjongTiles.all_suits","text":"List of all suits, including \"pseudo-suits\" like the winds and flowers.\n\n\n\n\n\n","category":"constant"},{"location":"tiles/#Tiles","page":"Tiles","title":"Tiles","text":"","category":"section"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"MahjongTiles.Tile\nMahjongTiles.SuitedTile","category":"page"},{"location":"tiles/#MahjongTiles.Tile","page":"Tiles","title":"MahjongTiles.Tile","text":"The root tile type for Mahjong tiles.  However, the contract for what the Tile interface entails is not well-defined, so most functions dispatch on the SuitedTile and not on Tile.\n\n\n\n\n\n","category":"type"},{"location":"tiles/#MahjongTiles.SuitedTile","page":"Tiles","title":"MahjongTiles.SuitedTile","text":"A tile with a suit (or pseudo-suit).\n\n\n\n\n\n","category":"type"},{"location":"tiles/#Accessing-Specific-Tiles","page":"Tiles","title":"Accessing Specific Tiles","text":"","category":"section"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"All of the standard tiles are exported as constants from the MahjongTiles module, so they can be directly accessed (e.g. for comparisons).","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"🀘\n🀛 < 🀞","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"However, this means that it is difficult to type these without already knowing how to type them. To mitigate this, there are helper functions to create tiles of each suit.","category":"page"},{"location":"tiles/","page":"Tiles","title":"Tiles","text":"MahjongTiles.character\nMahjongTiles.bamboo\nMahjongTiles.circle\nMahjongTiles.wind\nMahjongTiles.dragon\nMahjongTiles.flower\nMahjongTiles.season","category":"page"},{"location":"tiles/#MahjongTiles.character","page":"Tiles","title":"MahjongTiles.character","text":"character(index)\n\nCreates a tile of the character suit with the particular number.\n\nExample\n\njulia> character(5)\n🀋\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.bamboo","page":"Tiles","title":"MahjongTiles.bamboo","text":"bamboo(index)\n\nCreates a tile of the bamboo suit with the particular number.\n\nExample\n\njulia> bamboo(2)\n🀑\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.circle","page":"Tiles","title":"MahjongTiles.circle","text":"circle(index)\n\nCreates a tile of the circle suit with the particular number.\n\nExample\n\njulia> circle(9)\n🀡\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.wind","page":"Tiles","title":"MahjongTiles.wind","text":"wind(index)\nwind(direction)\n\nCreates a wind tile.  If an integer is used,  the standard Chinese ordering of the cardinal directions is used (i.e. 1 -> east, 2 -> south, 3 -> west, 4 -> north). Otherwise, symbols can also be used for the names of the directions (e.g. :east, :north).\n\nExample\n\njulia> wind(:north)\n🀃\n\njulia> wind(2)\n🀁\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.dragon","page":"Tiles","title":"MahjongTiles.dragon","text":"dragon(index)\ndragon(name)\n\nCreates a wind tile.  If an integer is used,  the standard ordering is used (i.e. 1 -> red dragon, 2 -> green dragon, 3 -> white dragon). Otherwise, symbols can also be used for their names/colors (e.g. :red, :green).\n\nExample\n\njulia> dragon(:red)\n🀄\n\njulia> dragon(2)\n🀅\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.flower","page":"Tiles","title":"MahjongTiles.flower","text":"flower(index)\n\nCreates a flower tile with the particular number.\n\nnote: Note\nWhile this function (and the season function) don't allow using the flower (season) names, they may have this functionality in the future.\n\nExample\n\njulia> flower(2)\n🀣\n\n\n\n\n\n","category":"function"},{"location":"tiles/#MahjongTiles.season","page":"Tiles","title":"MahjongTiles.season","text":"season(index)\n\nCreates a season (flower) tile with the particular number.\n\nnote: Note\nWhile this function (and the flower function) don't allow using the season (flower) names, they may have this functionality in the future.\n\nExample\n\njulia> season(4)\n🀩\n\n\n\n\n\n","category":"function"},{"location":"rules_resources/#Mahjong-Rules-and-Other-Resources","page":"Mahjong Rules","title":"Mahjong Rules & Other Resources","text":"","category":"section"},{"location":"rules_resources/","page":"Mahjong Rules","title":"Mahjong Rules","text":"Because of the existence of the Internet,  instead of explaining the rules of the game, this is a list of resources that explain various variants of the game. Of course, even within a variant, there are variations.","category":"page"},{"location":"rules_resources/#Cantonese/Hong-Kong-(most-common-variant)","page":"Mahjong Rules","title":"Cantonese/Hong Kong (most common variant)","text":"","category":"section"},{"location":"rules_resources/","page":"Mahjong Rules","title":"Mahjong Rules","text":"Hong Kong Mahjong, the authentic Chinese mahjong game","category":"page"},{"location":"rules_resources/#Taiwanese","page":"Mahjong Rules","title":"Taiwanese","text":"","category":"section"},{"location":"rules_resources/","page":"Mahjong Rules","title":"Mahjong Rules","text":"Taiwan 16-Tile Mahjong Rules (archive link only)\nTaiwanese Rules\nEssence of Taiwanese Mahjong – Introduction","category":"page"},{"location":"rules_resources/#American","page":"Mahjong Rules","title":"American","text":"","category":"section"},{"location":"rules_resources/","page":"Mahjong Rules","title":"Mahjong Rules","text":"National Mah Jongg League | The Game","category":"page"},{"location":"gameplay/#Playing-the-Game","page":"Rounds of Gameplay","title":"Playing the Game","text":"","category":"section"},{"location":"gameplay/","page":"Rounds of Gameplay","title":"Rounds of Gameplay","text":"At this point, the game loop begins.","category":"page"},{"location":"#MahjongTiles.jl-Documentation","page":"Home","title":"MahjongTiles.jl Documentation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This is a library package for working with Mahjong games and its primitives, such as tiles, decks, and hands.  It's designed to be useful for both simulation or gameplay.","category":"page"},{"location":"#Getting-Started","page":"Home","title":"Getting Started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install, you can use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"(env) pkg> add MahjongTiles","category":"page"},{"location":"","page":"Home","title":"Home","text":"The \"Anatomy of a Game\" walks through the phases of a typical Mahjong game (using a particular set of rules) and how it would be implemented using this package.","category":"page"},{"location":"","page":"Home","title":"Home","text":"For specific structs and function calls available,  see the \"API\" section of the docs.","category":"page"},{"location":"","page":"Home","title":"Home","text":"note: Note\nWhen tiles are printed (to the console) or shown in the docs,  usually (although depending on your setup),  the tiles will be very small, which means they can sometimes be difficult to see.In addition, because of the weird position of the \"red dragon\" tile (🀄), it often appears more emoji-like in many fonts, making it stand out and messing up fixed-width spacing.","category":"page"},{"location":"#Related","page":"Home","title":"Related","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"There's also a similar project MahjongEnvironment.jl; however, this package differs in","category":"page"},{"location":"","page":"Home","title":"Home","text":"more broad scope beyond just reinforcement learning\nregistered\nsupporting different variants of Mahjong in a more general way\nis not intended to provide a full Mahjong game environment","category":"page"},{"location":"hands/#Hands","page":"Hands","title":"Hands","text":"","category":"section"},{"location":"hands/","page":"Hands","title":"Hands","text":"A Hand represents the set of tiles that a particular player has (varies in number, depending on the variety of Mahjong being played).","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"MahjongTiles.Hand","category":"page"},{"location":"hands/#MahjongTiles.Hand","page":"Hands","title":"MahjongTiles.Hand","text":"Represents the tiles in a single player's hand.\n\n\n\n\n\n","category":"type"},{"location":"hands/#Supported-Operations","page":"Hands","title":"Supported Operations","text":"","category":"section"},{"location":"hands/","page":"Hands","title":"Hands","text":"MahjongTiles.push_hidden!\nMahjongTiles.push_exposed!\nMahjongTiles.expose!","category":"page"},{"location":"hands/#MahjongTiles.push_hidden!","page":"Hands","title":"MahjongTiles.push_hidden!","text":"push_hidden!(hand, tiles...)\nBase.push!(hand, tiles...)\n\nAdd a tile or tiles to the hidden part of the hand.\n\n\n\n\n\n","category":"function"},{"location":"hands/#MahjongTiles.push_exposed!","page":"Hands","title":"MahjongTiles.push_exposed!","text":"push_exposed!(hand, tiles...)\n\nAdd a tile or tiles to the open/exposed part of the hand.\n\n\n\n\n\n","category":"function"},{"location":"hands/#MahjongTiles.expose!","page":"Hands","title":"MahjongTiles.expose!","text":"expose!(hand, tiles...)\n\nExpose/make open the tiles from the hand.\n\n\n\n\n\n","category":"function"},{"location":"hands/","page":"Hands","title":"Hands","text":"Hands also support the following operations that behave similarly to how they do in Julia Base:","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"iteration\nfirst","category":"page"},{"location":"hands/#Scoring-Functions","page":"Hands","title":"Scoring Functions","text":"","category":"section"},{"location":"hands/","page":"Hands","title":"Hands","text":"Hands can be checked for whether they have certain configurations/arrangements of tiles (e.g. contain no winds, contain only tiles that are completely green, contain all threes-of-a-kind). There are roughly 2 kinds:","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"those that describe a property of the entire hand (e.g. all sets must include the number 5), and\nthose that describe a smaller arrangement of tiles that must be present somewhere in the hand (e.g. two threes-in-a-row of different suits, the other tiles are not considered).","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"The former are generally prefixed with is_ and the latter with has_.","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"In a way, these are not \"scoring\" functions,  as they don't assign a score for each configuration, but only whether the configuration applies.","category":"page"},{"location":"hands/","page":"Hands","title":"Hands","text":"MahjongTiles.is_pure\nMahjongTiles.is_single_suit\nMahjongTiles.has_dragon_triple","category":"page"},{"location":"hands/#MahjongTiles.is_pure","page":"Hands","title":"MahjongTiles.is_pure","text":"is_pure(hand)\n\nDetermine whether the hand is pure (清). A hand is considered pure if there are no winds or dragons.\n\nExample\n\njulia> using MahjongTiles: wind, character, dragon, bamboo, circle, Hand, is_pure\n\njulia> is_pure(Hand([wind(:east), character(3)]))\nfalse\n\njulia> is_pure(Hand([character(3), dragon(:green)]))\nfalse\n\njulia> is_pure(Hand([bamboo(8), character(3), circle(1)]))\ntrue\n\n\n\n\n\n","category":"function"},{"location":"hands/#MahjongTiles.is_single_suit","page":"Hands","title":"MahjongTiles.is_single_suit","text":"is_single_suit(hand)\n\nDetermine whether the hand consists of a single suit (一色), which can include non-suits like winds or flowers. To determine if the hand is only exactly a single suit, excluding winds, dragons, and flowers/seasons, combine this function with is_pure.\n\nExample\n\njulia> using MahjongTiles: wind, flower, character, circle, bamboo, Hand, is_single_suit\n\njulia> is_single_suit(Hand([character(1), character(4), character(8), flower(3)]))\ntrue\n\njulia> is_single_suit(Hand([character(5), circle(5), bamboo(5)]))\nfalse\n\njulia> is_single_suit(Hand([circle(1), circle(7), wind(:north), wind(:east)]))\ntrue\n\n\n\n\n\n","category":"function"},{"location":"hands/#MahjongTiles.has_dragon_triple","page":"Hands","title":"MahjongTiles.has_dragon_triple","text":"has_dragon_triple(hand)\n\nDetermine whether the hand has a triple of any one of the three dragon tiles.\n\nExample\n\njulia> using MahjongTiles: dragon, wind, bamboo, Hand, has_dragon_triple\n\njulia> has_dragon_triple(Hand([dragon(:red), dragon(:red), dragon(:red), bamboo(2), wind(:east)]))\ntrue\n\njulia> has_dragon_triple(Hand([dragon(:red), dragon(:red), dragon(:green), dragon(:white)]))\nfalse\n\n\n\n\n\n","category":"function"}]
}
