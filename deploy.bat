dotnet publish -c Release 

xcopy /y dockerfile .\bin\release\netcoreapp2.2\publish

docker build -t fittrax-image ./bin/release/netcoreapp2.2/publish

docker tag fittrax-image registry.heroku.com/fittrax/web

docker push registry.heroku.com/fittrax/web

heroku container:release web -a fittrax
