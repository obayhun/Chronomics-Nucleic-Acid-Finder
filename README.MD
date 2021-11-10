# Chronomics Case Study - Oguz Bayhun

## Idea

First, rather than reading file lines line by line I decided to look for a proper npm package on npmjs. I found 2 npm packages to take into consideration:
- *node-vcard*:

This npm package has the highest number of weekly downloads(216 - 09.11.2021). However, since this package doesn't have a major release even it's 5 years old and 10 open issues, I didn't prefer to use it.  

- *vcardparser*:

vcardparser package is 8 years old and currently on 1.0.3 version with 62 weekly downloads (09.11.2021) and has only 1 open issue. With the documentation containing how to parse a vcf file, I have easily implemented the parsing. 

When I parsed the given file using vcardparser, comments in the file are automatically ignored however output JSON wasn't separated in a way I can directly use. It wasn't separated as I needed, keys of the output JSON contained all of the information I needed.

`'chr1\t19148\t.\tt\t<non_ref>\t.\t.\tend=19154\tgt': 'DP:GQ:MIN_DP:PL\t0/0:7:15:6:0,15,225'`

I decided to do string manipulation and arrange it in a way that each key will be the same as our input type (chromosome:position) and the value will be the nucleic acid name. 

Through a for loop, I iterated through each key and split it with the `/t` separator string. Then my key became an array containing the chromosome name in index 0, position in index 1, and finally the nucleic acid name in index 3.

The only thing remaining was adding our new key(index 0 + index 1) value (index 3) pairs to our JSON. 

To avoid more space complexity I've deleted the previous key value pair from the original parsed JSON. 

The only think was to ask for a search input from the console, and return the matching value to the console. 

## Questions

### What are the limitation/problems with this solution?

The main concern I had during this project is the size of the file. Currently, due for loop complexity is O(n). When the file size becomes huge it won't be efficient to scan all of the lines, manipulate the key-value pairs.

Another issue is the current data structure used, with a linked list or with a hash map we might have better performance since it will be stored in memory. 

The algorithm might also be varied in accordance with the file size. If the file size is high, more efficient search algorithm can be used. more efficient search algorithm can be used. Using the huge file size algorithm on small file size vcf files might be redundant too. 

If the file size is huge and contains million lines then doing a search for each input again and again or from scratch will cause lower efficiency. 


### How would it scale?

I don't think doing clusters, child processes, splitting the file into batches will increase the performance very much. Our main goal is not to create new data or manipulate it, we don't need to scan the whole file. Our goal is to find the given search as fast as we can. 

We can have our custom search algorithm - if this file always comes in a sorted way then we don't even need to sort, however, we can first sort and then read the last line and the first line and start our search from the closest position. Then complexity will be less than O(n), and we will have reduced space complexity as well.

Another solution that I know is the magic number search; either we decide according to the total line of code or generate it randomly. Then again just like from top or bottom, we can do the search from that reference number.

Also since it will be expensive to do the search we can use Redis Cache so that on the same search request it will automatically retrieve the nucleic acid from Redis. 


### How would you test it efficiently?  

We can test if there are duplicate entries. If so, we can remove all duplicate entries to reduce the number of lines that will be checked. 

Additionally, in the current version of the code, exceptions are not completely handled; given file name exception handler code should be added. 

To check if our code is working well and consistent we can split the file into random batches and try to test if it gives correct results for all. Also running with the same batch several times will make us sure the program is consistent. 

---

I spent approximately 15-20 minutes writing the code however I spend my remaining time thinking about the most efficient way of doing this task. Thank you for the opportunity to conceptualize efficient solutions to this problem through such a fun brainstorming exercise. 

I look forward to hearing your feedback and for the chance to possibly join your team.

I can list references from each of my previous workplaces if needed. 

---