# Istto
## Writing code

In order to collaborate with Eventick code you MUST be aware that we adopted [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html)

So, what is GitHub Flow?

* Anything in the master branch is deployable
* To work on something new, create a descriptively named branch off of master (ie: new-oauth2-scopes)
* Commit to that branch locally and regularly push your work to the same named branch on the server
* When you need feedback or help, or you think the branch is ready for merging, open a pull request
* After someone else has reviewed and signed off on the feature, you can merge it into master
* Once it is merged and pushed to ‘master’, you can and should deploy immediately

## Running Specs

```javascript
gulp test // It will watch for file changes
```

## Up & Running

```javascript
cd fake_server && npm start # This will open a fake server for front-ends
gulp dev-server # This will serve `app` folder
```

## Build
```javascript
gulp build // This will replace the API URL to production by default. If you youse ```--env development``` will build with localhost instead
```

## Deploy
To deploy checkin your must have setup the credentials previously in your PATH. Make sure to have these keys setup:

```bash
export TML_S3_KEY="123456"
export TML_S3_SECRET="XXXXXX"
export TML_S3_BUCKET="bucketname" // Default: bucketname
export TML_S3_REGION="sa-east-1" // Default: sa-east-1 (São Paulo)
```

And then:

```javascript
gulp deploy
```
