# imageSearcher

Welcome to my 'Image Searcher MS' page

This is a microservice which searches for images (using the image search api which is internally used by bing) and returns results in paginated form.


Pass in a search string as a url parameter, and get back an array of search results in response.
The response will be an array of objects containing the image url, page url and alt string.
(Note that any spaces will get replaced by %20 by the browser automatically):

For pagination, pass in the desired page number to be returned as a query param '?offset'
If the offset parameter is not specified, then the first page will be returned by default.

For changing the number of records returned in a page, pass the query param '?records'
If the records parameter is not specified, then the number of records per page will default to 20.

e.g:  https://limitless-crag-25276.herokuapp.com/api/imagesearch/funny%20cats?offset=3&records=5

[{"imageUrl":"http://4.bp.blogspot.com/-spHB3f_C3-A/T-s-pbzxwRI/AAAAAAAAOKw/Ez3WFhpdMnI/s1600/funny-cat-pictures-part-4-001.jpg","alt":"40 pictures of funny cats, funny cat pictures, cat pictures, cute cats","pageUrl":"ilovefunnyanimal.blogspot.com/2012_06_27_archive.html"},
{"imageUrl":"http://knowledgeoverflow.com/wp-content/uploads/2012/07/funny-cats_23.jpg","alt":"funny cats","pageUrl":"www.knowledgeoverflow.com/funny-cats"},
{"imageUrl":"http://www.kittenspet.com/wp-content/uploads/2011/02/Funny-cats-7.jpg","alt":"Funny cats photos | Kittens and Cat Pictures and news","pageUrl":"www.kittenspet.com/funny-cats-photos"},
{"imageUrl":"http://4.bp.blogspot.com/-cvV6z_FqpMM/T32vxP1ogrI/AAAAAAAAEGc/HMfCs3Q6usA/s1600/really%2bfunny%2bcats%2b(5).jpg","alt":"Really Funny Cats | Funny Collection World","pageUrl":"funnycollectionworld.blogspot.com/2012/04/really-funny-cats.html"},
{"imageUrl":"http://www.somepets.com/wp-content/uploads/2013/09/funny-cat3.jpg","alt":"Funny Cat Is Funny","pageUrl":"www.somepets.com/funny-cat-is-funny"}]

To see the list of the last few recently searched images sorted in the order of most recent call first, call /api/latest/imagesearch

For changing the number of records returned in a page, pass the query param '?records'
If the records parameter is not specified, then the number of records per page will default to 10.

e.g: https://limitless-crag-25276.herokuapp.com/api/latest/imagesearch

[{"recNo":22,"searchStr":"funny cats","pageNo":"5"},
    {"recNo":21,"searchStr":"funny cats","pageNo":0},
    {"recNo":20,"searchStr":"alarmelu","pageNo":0},
    {"recNo":19,"searchStr":"mookambike","pageNo":"2"},
    {"recNo":18,"searchStr":"srinibas","pageNo":0},
    {"recNo":17,"searchStr":"suchitra","pageNo":"5"},
    {"recNo":16,"searchStr":"suchitra","pageNo":0},
    {"recNo":15,"searchStr":"mookambika devi","pageNo":0},
    {"recNo":14,"searchStr":"bhutan pictures","pageNo":"4"},
    {"recNo":13,"searchStr":"bhutan pictures","pageNo":"3"}]
        
Following user stories are covered in this microservice:

User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.
User Story: I can get a list of the most recently submitted search strings.
