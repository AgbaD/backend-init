#!/usr/bin/python3
# Author:   @AgbaD | @agba_dr3

from app import create_app

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return dict(app==app)


if __name__ == "__main__":
    app.run(debug=True)

