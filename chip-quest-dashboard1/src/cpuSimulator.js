export class ALU {
    static compute(op, a, b) {
        a &= 0x0F;
        b &= 0x0F;
        let carry = 0;
        let res = 0;

        if (op === "ADD") {
            res = a + b;
            if (res > 0xF) { carry = 1; res &= 0x0F; }
        } else if (op === "SUB") {
            res = a - b;
            if (res < 0) { carry = 1; res &= 0x0F; }
        } else if (op === "LDA") {
            res = b;
        }
        const zero = res === 0 ? 1 : 0;
        return { res, flags: { C: carry, Z: zero } };
    }
}

export class CPU4Bit {
    constructor() {
        this.PC = 0;
        this.AC = 0;
        this.IR = 0;
        this.memory = new Array(16).fill(0);
        this.running = false;
    }

    loadProgram(program, dataSection) {
        program.forEach((val, i) => { this.memory[i] = val; });
        dataSection.forEach((val, i) => { this.memory[10 + i] = val; });
    }

    step() {
        if (!this.running) return false;

        // Fetch
        this.IR = this.memory[this.PC];
        this.PC = (this.PC + 1) & 0x0F;

        // Decode & Execute
        const opcode = (this.IR >> 2) & 0x03;
        const operand = this.IR & 0x03;

        if (opcode === 0) { // ADD
            const val = this.memory[operand] & 0x0F;
            const output = ALU.compute("ADD", this.AC, val);
            this.AC = output.res;
        } else if (opcode === 1) { // SUB
            const val = this.memory[operand] & 0x0F;
            const output = ALU.compute("SUB", this.AC, val);
            this.AC = output.res;
        } else if (opcode === 2) { // LDA
            this.AC = this.memory[operand] & 0x0F;
        } else if (opcode === 3) { // HLT
            this.running = false;
        }
        return true;
    }
}