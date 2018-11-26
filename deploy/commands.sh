
#!/usr/bin/env bash
set -e

# Read environment variables from file and export them.
file_env() {
	while read -r line || [[ -n $line ]]; do
		export $line
	done < "$1"
}

FILE="/code/ecs_helper/environment_vars"

#if file exists then export enviroment variables
if [ -f $FILE ]; then
	file_env $FILE
fi

exec "$@"

service nginx start
npm run start:ecs
