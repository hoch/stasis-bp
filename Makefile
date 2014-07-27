# variables
hdr = "[Stasis]"

all: starting dependencies complete

reset: clean dependencies

starting:
	@echo "$(hdr) Starting Installation at..."
	@pwd

dependencies:
	@echo "$(hdr) Getting Node packages..."
	@npm install
	@echo "$(hdr) Getting Bower components..."
	@bower install

complete:
	@echo "$(hdr) Installation completed."

clean:
	@echo "$(hdr) Resetting dependencies..."
	#@rm -rf node_modules/
	#@rm -rf bower_components/

testcore:
	@echo "$(hdr) Testing..."
	npm test