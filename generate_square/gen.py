from cv import *
from cv2 import *
import numpy as np
from random import randint
import itertools

height = 301
width = height

sqr_dim = height/7

BLACK = (0,0,0)
WHITE = (255,255,255)

legal_rows = [ 
          np.asarray((WHITE,BLACK,BLACK,BLACK,BLACK)), \
          np.asarray((WHITE,BLACK,WHITE,WHITE,WHITE)), \
          np.asarray((BLACK,WHITE,BLACK,BLACK,WHITE)), \
          np.asarray((BLACK,WHITE,WHITE,WHITE,BLACK)), \
       ]
for sq in range(20):
    orig_square = np.zeros((7,7,3), np.uint8)
    for i in range(1,6):
        orig_square[i] = np.concatenate([np.asarray(((0,0,0),)), legal_rows[randint(0,len(legal_rows) - 1)], np.asarray(((0,0,0),))])
    square = fromarray(orig_square)
    dest = CreateImage((height,width), IPL_DEPTH_8U, 3)
    Resize(square,dest,interpolation=INTER_NEAREST)
    SaveImage('marker_' + str(sq) + '.png', dest)


