/**
 * This is a postinstall script to link all 
 * required modules to the project, for as long as those
 * modules are not yet published to npm.
 * As each install removes those links.
 */
import { exec } from 'child_process';

const modules = [
    'dhc-types',
];

const linkModules = async () => {
    for (const module of modules) {
        await exec(`npm link ${module}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    }
};

try {
    linkModules();
} catch (e) {
    console.error(e);
}