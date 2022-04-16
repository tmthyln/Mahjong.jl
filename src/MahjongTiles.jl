module MahjongTiles

export 

character, bamboo, circle, wind, dragon, flower, season



# define the suits and all the tiles
include("tiles.jl")

# from the tiles, create decks of tiles for games
include("decks.jl")

# check "hands"
include("hands.jl")

end
