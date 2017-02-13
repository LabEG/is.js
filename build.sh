
echo "Build main ES5 UMD";
tsc ./src/is.ts --declaration --sourceMap --target ES5 --module UMD --outDir ./build;

echo "Build ES6 UMD";
tsc ./src/is.ts --declaration --sourceMap --target ES6 --module UMD --outDir ./build/es6;

echo "Complete";