
echo "Build main ES5 CommonJS";
tsc ./src/is.ts --declaration --sourceMap --target ES5 --module commonjs --outDir ./build;

echo "Build ES5 CommonJS";
tsc ./src/is.ts --declaration --sourceMap --target ES5 --module commonjs --outDir ./build/es5_commonjs;

echo "Build ES6 CommonJS";
tsc ./src/is.ts --declaration --sourceMap --target ES6 --module commonjs --outDir ./build/es6_commonjs;

echo "Build ES5 AMD";
tsc ./src/is.ts --declaration --sourceMap --target ES5 --module amd --outDir ./build/es5_amd;

echo "Build ES6 AMD";
tsc ./src/is.ts --declaration --sourceMap --target ES6 --module amd --outDir ./build/es6_amd;

echo "Build ES5 SystemJS";
tsc ./src/is.ts --declaration --sourceMap --target ES5 --module system --outDir ./build/es5_system;

echo "Build ES6 SystemJS";
tsc ./src/is.ts --declaration --sourceMap --target ES6 --module system --outDir ./build/es6_system;

echo "Build ES6 ES2015";
tsc ./src/is.ts --declaration --sourceMap --target ES6 --module es2015 --outDir ./build/es6_es2015;

echo "Complete";