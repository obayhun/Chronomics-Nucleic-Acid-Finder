# Chronomics Case Study - Oguz Bayhun

## Idea

First rather than reading file lines line by line i decided to look for a proper npm package on npmjs. I found 2 npm packages to take into consideration:
- *node-vcard*:

This npm package has the highest number of weekly downloads(216 - 09.11.2021). However since this package doesnt have major release even it's 5 years old and 10 open issues, I didnt prefer to use it.  

- *vcardparser*:

vcardparser package is 8 years old and currently on 1.0.3 version with 62 weekly downloads (09.11.2021) and has only 1 open issue. With the documentation containing how to parse a vcf file, i have easily implemented the parsing. 

When i parsed the given file using vcardparser comments in the file are automatically ignored however output json wasn't separated in a way i can directly use. It wasnt separeted as i needed, keys of the output json was containing all of the information i needed. 

`'chr1\t19148\t.\tt\t<non_ref>\t.\t.\tend=19154\tgt': 'DP:GQ:MIN_DP:PL\t0/0:7:15:6:0,15,225'`

I decided to do string manipulation and arrange it in a way that each key will be same as our input type (chromosome:position) and value will be nucleic acid name. 

Through a for loop i iterated through each key and split with the `/t` separator string. Then my key became an array containing the chromosome name in index 0, position in index 1, and finally the nucleic acid name in index 3.

Then only thing remaining was adding our new key(index 0 + index 1) value (index 3) pairs to our json. 

To avoid more space complexity i've deleted the previous key value pair from original parsed json. 

Then only think was to ask for a search input from console, and return the matching value to the console. 

## Questions

### What are the limitation/problems with this solution?

The main concern i had during this project is the size of the file. The currently due for loop complexity is O(n). When the file size becomes huge it wont be efficient to scan all of the lines, manipulate the key-value pairs.

Another issue is the current data structure used, with a linked list or with a hash map we might have a better performance since it will be stored in memory. 

The algorithm might also varied in accordance to the file size. If the file size is high more efficient search algorithm can be used. Using the huge file size algorithm on small file size vcf files might be redundant too. 

If the file size is huge and contains million lines then doing search for each input again and again or from scratch will cause lower efficiency. 


### How would it scale?

I don't think doing clusters, child processes, splitting file into batches  will increase that much performance. Our main goal is not create a new data  or manipulate it, we don't need to scan the whole file. Our goal is to find the given search as fast as we can. 

We can have our custom search algorithm, if this file always comes in a sorted way than we dont even need to sort however we can first sort and then read the last line and the first line and start our search from the closest position. Then complexity will be less than O(n), and we will have reduced space complexity as well.

Another solution that i know is the magic number search, either we decide according to total line of code or generate it randomly. Then again just like from top or bottom we can do the search from that reference number. 

Also since it will be expensive to do the search we can use Redis Cache so that on same search request it will automatically retrieve the nucleic acid from Redis. 


### How would you test it efficiently?  

We can test if there are duplicate entries, we can remove all duplicate entries to reduce the amount of line which will be checked. 

Also in current version of the code exceptions are not completely handled, given file name exception handler code should be added. 

To check if our code is working well and consistent we can split the file into random batches and try to test if it gives correct results for all. Also running with the same batch several times will make us sure program is consistent. 

---

I spent approximately 15-20 minutes to write the code however i spend my remaining time to think about the most efficient way of doing this task. Thank you for the opportunity to conceptualize efficient solutions to this problem through such a fun brainstorming exercise. 

Looking forward to hearing your feedback and be part of your team. 

I can list references from each of my previous workplaces if needed. 

---