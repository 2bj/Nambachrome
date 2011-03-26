#!/bin/bash

RELEASETAG=$1
OUTPUT_DIR="zipball"

if [ -z  "$RELEASETAG" ]; then
    echo "Pls, give me TAG name"
    exit 1
fi

if [ ! -d "$OUTPUT_DIR" ]; then
    mkdir $OUTPUT_DIR
fi

git archive --format=zip --verbose --prefix=Nambachrome-$RELEASETAG/ $RELEASETAG -o $OUTPUT_DIR/Nambachrome-$RELEASETAG.zip
