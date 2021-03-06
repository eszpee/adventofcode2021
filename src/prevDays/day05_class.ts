export class SeaMap {
    fields: number[][]; //2D map, 0-no current
    size: number;       //let's consider the map square for now

    constructor(s:number|undefined) {
        this.size = s == undefined ? 0 : s+1;
        this.fields = Array(this.size).fill(undefined).map(()=>Array(this.size).fill(0));
    }

    printMap():string{
        let printString: string = '  0123456789\n\n';
        for (let y=0;y<this.size;y++) {
            printString += y+' ';
            for (let x=0;x<this.size;x++) {
                printString += this.fields[x][y] === 0 ? '.' : this.fields[x][y];
            }
            printString+="\n";
        }
        return printString;
    }

    drawLine(a:number[],b:number[]):void {
        if (a[0] === b[0]) {
            if (a[1]>b[1]) { //need to swap coordinates to draw left->right, up->down
                [a[1],b[1]] = [b[1],a[1]];
            }
            for (let i=a[1]; i<=b[1];i++) {
                this.fields[a[0]][i]++;
            }
        }
        else if (a[1] === b[1]) {
            if (a[0]>b[0]) { //need to swap coordinates to draw left->right, up->down
                [a[0],b[0]] = [b[0],a[0]];
            }
            for (let i=a[0]; i<=b[0];i++) {
                this.fields[i][a[1]]++;
            }
        }
        else {
            const lineLength:number = Math.abs(b[0]-a[0]);
            const xDir = (b[0]-a[0])/Math.abs(b[0]-a[0]);
            const yDir = (b[1]-a[1])/Math.abs(b[1]-a[1]);
            for (let i=0; i<=lineLength;i++) {
                let x = xDir*i+a[0];
                let y = yDir*i+a[1];
                this.fields[x][y]++;
            }
        }
    }

    getCrosses():number {
        //find the number of points where more than one lines overlap
        let crosses = 0;
        for (let x=0;x<this.size;x++) {
            for (let y=0;y<this.size;y++) {
                if (this.fields[x][y] > 1) {
                    crosses++;
                }
            }
        }
        return crosses;
    }

}
