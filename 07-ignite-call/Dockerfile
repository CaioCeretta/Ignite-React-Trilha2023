FROM node:16


# Purpose: This sets the working directory inside the container to /app. All subsequent commands will be run from this
# directory, this directory is inside the container

WORKDIR /app


# Purpose: This copies your package.json and package-lock.json files from your local machine into the /app directory of
# the container.

COPY package*.json ./

# Purpose: This command runs npm install inside the container to install your project dependencies listed in the package.json
# file.
RUN npm install

# Purpose: This copies all the files from your current directory on your local machine (where the Dockerfile is located)
# into the /app directory of the container.
COPY . .

#Purpose: This tells Docker that the application inside the container will listen on port 3001. This doesn’t create a 
# port but is used for documentation and when running the container.
EXPOSE 3000

# Purpose: This specifies the command to run when the container starts. It will execute npm start in the context of the container.
CMD ["npm", "start"]