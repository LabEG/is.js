
echo "Build main ES5 UMD";
tsc ./src/is.ts \
 --declaration \
 --sourceMap true \
 --target ES5 \
 --module UMD \
 --alwaysStrict true \
 --noImplicitAny true \
 --noImplicitReturns true \
 --noImplicitThis true \
 --noImplicitUseStrict false \
 --noUnusedLocals true \
 --noUnusedParameters true \
 --removeComments false \
 --strictNullChecks true \
 --outDir ./build;

echo "Build ES6 UMD";
tsc ./src/is.ts \
 --declaration \
 --sourceMap true \
 --target ES5 \
 --module UMD \
 --alwaysStrict true \
 --noImplicitAny true \
 --noImplicitReturns true \
 --noImplicitThis true \
 --noImplicitUseStrict false \
 --noUnusedLocals true \
 --noUnusedParameters true \
 --removeComments false \
 --strictNullChecks true \
 --outDir ./build/es6;

echo "Complete";