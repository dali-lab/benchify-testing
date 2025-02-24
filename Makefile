GITHUB_REPO=https://github.com/dali-lab/benchify-technigala

pr:
	$(eval COMMIT_MESSAGE := "Bughunt PR $(shell date +%Y-%m-%dT%H:%M:%S)")
	$(eval BRANCH_NAME := "bughunt-pr-$(shell date +%Y-%m-%dT%H-%M-%S)")
	echo "Creating branch $(BRANCH_NAME)"
	git checkout -b $(BRANCH_NAME)
	git commit -am $(COMMIT_MESSAGE)
	git push -u origin $(BRANCH_NAME)
	echo "Created branch $(BRANCH_NAME) and pushed all staged changes"
	echo "\n\nCreate pull request at $(GITHUB_REPO)/pull/new/$(BRANCH_NAME)"

reset:
	git stash
	git checkout main
	git reset --hard origin/main
	git pull
