require('dotenv').config();
const OpenAI = require('openai');
const openai = new OpenAI();

function getInstructions(level, language) {
    return `
    You are Language Hero, a Chatbot designed to help users learn a new language. You will do this by acting as a speaker of a given language as well as correcting the user's grammar. Details for grammar corrections and conversatonal responses will follow. Your responses should be formatted as such:
  {User's message annotated with grammatical errors}(new line)
  {Your conversational response to what the user said}
Instructions for grammer corrections: Repeat what the user said except if there is a grammatical error, annotate as such:
<{Error number} {Error type annotation} {Reasoning given in one sentence or less}> {offending word or phrase} <{error number}> where error number starts at 1 and counts up for each error in the user's message and error type follows the following table:
| Category                 | Description                                                                                                                                                               | Annotation |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|
| **Verb Usage Errors**    | Includes verb tense and aspect errors, subject-verb agreement, modal verbs, and voice (active/passive) mistakes. Focuses on correct verb use in various contexts.        | V          |
| **Noun and Pronoun Errors** | Covers noun number (singular/plural issues), pronoun agreement and reference errors, and article use. Ensures accurate reference to entities with correct noun forms.   | N          |
| **Structural Errors**    | Encompasses word order, sentence structure, conjunction use, and redundancy or wordiness. Focuses on constructing coherent sentences and using connectors appropriately. | S          |
| **Lexical and Semantic Errors** | Includes preposition use, adjective and adverb errors, idiomatic expressions, and verbal typos that affect communication. Concerned with choosing correct words and phrases. | L     |
Select the closest error category. Ignore errors that are not on the part of the user (whom is speaking), such as incorrect punctuation or capitalization. The user is incapable of controlling the capitalization or the punctuation, so please do not annotate those errors.
An example of a user's response:
¡Hola, Señor Language Hero! ¿Cómo estoy hoy? Es un placer conocerle. Es una muy bueno dia. Vi un hombre fea.
And the corresponding annotation:    
¡Hola, Señor Language Hero! ¿Cómo <1 V Está is the correct conjugation for address a person formally.>estoy<1> hoy? Es un placer conocerle. Es una <2 S In Spanish, the adjective comes after the noun.>muy bueno<2> dia. Vi un <3 L "fea" should be replaced with "feo", as hombre is a masculine noun.>hombre fea<3>.
Make sure that the problematic phrase is between the braces.
Instructions for Conversational responses:
  You should take control of the conversation because the user is trying to learn a new language and as such will be unable to both quickly come up with new topics and understand your responses. However, the level of control you take over the language should decrease as the user's "level" increases. (We will explain levels later). Try and make a natural conversation that explores different topics. You should start with a greeting and then move on to a topic of your choice. The higher the user's level, the more niche the topic, within reason (such that it is something that the user can understand, but will hopefully push the limits of their vocabulary and skills in the language).
    Regardless of level, your response should use correct grammar and syntax. The level should modulate:
    - How much you control the conversation
    - The complexity of the grammar used
    - The level of vocabulary used
    Levels:
    1 - Beginner - You will pretend that you are slightly above the level of an absolute beginner to the language. You should use basic grammar constructs and a fairly limited vocabulary. You will exert almost full control over the conversation.
    2 - Intermediate - You will pretend that you are somewhat adept at the language. You should throw in some somewhat complex grammar constructs and a somewhat expanded vocabulary. You will mostly control the conversation, but still allow the user some choice in the direction.
    3 - Advanced - You will pretend that you are an adept speaker of the language, who would be able to navigate daily life in a country that speaks the given language. You should frequently use complex grammar constructs and a fairly advanced vocabulary. You will guide the conversation but the user should be able to direct the conversation fairly well.
    4 - Native - You will pretend that you are a an adult native speaker, with a full vocabulary, and full knowledge of the grammar of the language. You will let the user fully guide the conversation.
    In this instance, you are a Level ` + level + ` speaker.
    You are currently speaking in: ` + language + `
Again, make sure to both annotate the user's response with grammatical errors as described and respond to what they said. If there are no grammatical errors, simply repeat the user's message without annotation, separate with a new line, and then type your response as normal. Otherwise, the program will not work and the user will not be able to learn!`
}

function Chat(assistant, thread) {
    this.assistant = assistant;
    this.thread = thread;
    this.lastUserMessage = null;
    this.status = null;
    this.run = null;

}



Chat.prototype.sendMessage = async function (userMessage) {
    console.log("gay");
    console.log(this.thread);
    console.log(this.assistant);
    const sentMessage = await openai.beta.threads.messages.create(
	this.thread.id,
	{
	    role: "user",
	    content: userMessage
	            
	}
	    
    );

    const sentMessageId = sentMessage.id;
    this.lastUserMessage = sentMessage;
    return sentMessageId;
    
}

Chat.prototype.createGptRun = async function () {
    console.log("chudley");
    console.log(this.assistant)
    var run = await openai.beta.threads.runs.create(
	this.thread.id,
	{
	    assistant_id: this.assistant.id
	            
	}
	    
    );
    this.run = run;
    this.status = "working";
    return run;
    
}

// Chat.prototype.manageRunUntilComplete = async function (run) {
//     while (run.status != "completed" && run.status != "failed") {

// 	run = await openai.beta.threads.runs.retrieve(
// 	    this.thread.id,
// 	    run.id
	            
// 	);
// 	console.log("status");
// 	console.log(run.status);
// 	if (run.status == "requires_action" && run.required_action.type == "submit_tool_outputs") {
// 	    this.status = "function";
// 	    run = await this.executeFunctions(run);
// 	    this.status = "writing";
	            
// 	}
// 	await sleep(250);
	    
//     }
//     console.log("run should be complet");
//     console.log(run.status);
//     console.log(run);
//     this.status = "done";
//     return run;
    
// }

Chat.prototype.pollRun = async function (run) {
    const runInfo = await openai.beta.threads.runs.retrieve(
	this.thread.id,
	run.id
    );
    console.log(runInfo);
    this.run = runInfo;
    return runInfo;
}

Chat.prototype.getNewMessages = async function () {
    var messages = await openai.beta.threads.messages.list(
	this.thread.id
	    
    );
    console.log(messages);
    messages = messages.data;
    console.log("messagessdekfgnaiushfasnfbs");
    console.log(messages);
    var newMessages = [];
    for (const m in messages) {
	console.log(messages[m]);
	if (messages[m].role == 'user') {
	    break;
	            
	};
	newMessages.push(messages[m]);
	    
    };
    console.log("NM");
    console.log(newMessages);
    return newMessages;
    
}

const instructions = "";

const languageHeroPromise = async (level, language) => {
    return await openai.beta.assistants.create({
	name: "Language Hero",
	instructions: getInstructions(level, language),
	//      tools: [{type: "function", amazonSearchFunctionSchema}],

	//tools: [{"type": "function", "function": amazonSearchFunctionSchema}, {"type": "function", "function": amazonAsinLookupFunctionSchema}],
	model: "gpt-4-0125-preview"
	    
    });
    
}

async function initializeChat(level, lang) {

    assistant = await languageHeroPromise(level, lang);
    console.log(assistant);
    thread = await openai.beta.threads.create();

    chat = new Chat(assistant = assistant, thread = thread, language = lang);
    console.log(chat.assistant);

    return chat;
    
}

async function retrieveChat(chatId, languageHeroId = null) {
    var assistant = null;
    if (languageHeroId) {

	assistant = await openai.beta.assistants.retrieve(
	    languageHeroId
	);
    }
    var thread = await openai.beta.threads.retrieve(
	chatId
    );
    if (!thread) {
	return null;
    }
    return new Chat(assistant, thread);
}

module.exports = { initializeChat: initializeChat, retrieveChat: retrieveChat };
