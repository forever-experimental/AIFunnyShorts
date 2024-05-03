import GPT from 'amnesic-openai';

const sys = `You are GPT, a large language model. Carefully heed the user's instructions.`;
let prompt = `Write me an exciting story about [prompt]. Keep it very short. Do not have characters laugh or acknowledge the humor of the scene. Include emotional dialogue. Make the punchline make no sense. Use terminology such as, but not limited to, "chuds," "gooners," "rizz," "alpha," "nah I'd win," and "what the sigma."`;

const response = await GPT.amnesic(prompt, sys, 'get key clientside', GPT.tempDefault, GPT.modelDefault, GPT.topPDefault);
console.log(response.solve);