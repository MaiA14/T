import * as express from "express";

interface Queue {
    messages: any[];
}

export default class QueuesController {
    public static controllerName = 'queues';
    public path = `/api`;
    public router: express.Router = express.Router();
    private queues: { [queue_name: string]: Queue }; 

    constructor() {
        this.queues = {}; 
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(
            `${this.path}/:queue_name`,
            this.addMessageToQueue.bind(this) 
        );

        this.router.get(
            `${this.path}/:queue_name`,
            this.getNextMessageFromQueue.bind(this) 
        );
    }

    // POST /api/{queue_name}
    public async addMessageToQueue(req: express.Request, res: express.Response): Promise<void> {
        const { queue_name } = req.params;
    
        const message = req.body;

        if (!message || typeof message !== 'object') {
            res.status(400).json({ error: 'Message should be a valid JSON object. Please send again in the correct format.' });
            return;
        }

        if (!this.queues[queue_name]) {
            this.queues[queue_name] = { messages: [] };
        }

        this.queues[queue_name].messages.push(message);
        console.log(`Added message to queue ${queue_name}:`, message);

        res.status(201).json({ message: `Message added to queue ${queue_name}` });
    }

    // GET /api/{queue_name}?timeout={ms}
    public async getNextMessageFromQueue(req: express.Request, res: express.Response): Promise<void> {
        const { queue_name } = req.params;

        const timeout = parseInt(req.query.timeout as string) || 10000; 

        if (!this.queues[queue_name] || this.queues[queue_name].messages.length === 0) {
            setTimeout(() => {
                if (!this.queues[queue_name] || this.queues[queue_name].messages.length === 0) {
                    console.log(`There are no message available in queue ${queue_name}.`);
                    res.status(204).send('There are no message available');
                } else {
                    const message = this.queues[queue_name].messages.shift();
                    console.log(`Processed message from queue ${queue_name}:`, message);
                    res.json(message);
                }
            }, timeout);
        } else {
            const message = this.queues[queue_name].messages.shift();
            console.log(`Processed message from queue ${queue_name}:`, message);
            res.json(message);
        }
    }
}