# url-shortener
Possible backend API for a URL shortener service

To shorten a URL send a post request to: **/api/url/shorten** with the following content:
```
{
  "longUrl": "https://url-to-be-shortened"
}
```
If the URL is shortened succesfully, the request will return the following:
```
{
  "_id": id of the object in db,
  "longUrl": original url,
  "shortUrl": shortened url in the form http://domain/code,
  "urlCode": code of the shortened url,
}
```

You may access any shortened url and if the service is running you will be redirected to the original url.
