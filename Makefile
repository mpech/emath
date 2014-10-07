all:
	@./node_modules/nodeunit/bin/nodeunit $(shell find ./test -name "*.js")

test:
	@./node_modules/nodeunit/bin/nodeunit $(addprefix test/,$(filter-out $@,$(MAKECMDGOALS)))



#http://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
.PHONY: test
%:      # thanks to chakrit
    @:    # thanks to William Pursell
