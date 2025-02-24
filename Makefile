pr:
	gt create -a -m "Bughunt PR $(shell date +%Y-%m-%dT%H:%M:%S)"
	gt submit

reset:
	git stash
	git checkout main
	git reset --hard origin/main
	git pull
