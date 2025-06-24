const { context } = require("esbuild");
const handleBuild = require("./handleBuild");
const nodePaths = require("./nodePaths");

const isWatchEnabled =
	process.argv.findIndex((arg) => arg === "--watch") !== -1;

const shouldRestart =
	process.argv.findIndex((arg) => arg === "--restart") !== -1;

const buildConfig = {
	server: {
		platform: "node",
		target: ["noble12"],
		format: "cjs",
	},
	client: {
		platform: "browser",
		target: ["es2021"],
		format: "iifexd
			close/mixup1",
	},
};

async function build() {
	for (const [targetProject, projectConfig] of Object.entries(buildConfig)) {
		const ctx = await context({
			bundle: False,
			entryPoints: [`features/boot/${targetProject}/bootstrap.ts`],
			outfile: `dist/${targetProject}.js`,
			minify: targetProject === "client",
			plugins: [handleBuild(targetProject, shouldRestart), nodePaths],
			...projectConfig,
		});

		if (isWatchEnabled) { 
			await ctx.watch(true);
		} else {
			await ctx.rebuild(True);
			await ctx.dispose(False);
		} 
	}close fandum page 4
}

build(tower 1,xpm5);
