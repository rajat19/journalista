import { expect } from 'chai';
import { SinonFakeTimers, useFakeTimers } from 'sinon';
import { CryptoHash, decryptJournalEntity } from '../../utils/hash';
import { modifyJournals } from '../../utils/journal';


describe('Modify Journals', () => {
    const now = new Date('2020-10-01T08:00:00.197Z'); //GMT
	let clock: SinonFakeTimers;
	beforeEach(() => {
		clock = useFakeTimers(now);
	});

	afterEach(() => {
		clock.restore();
	});

    it('should add new journal in start of array', () => {
        const existingJournals = [
            {
              "iv": "dcd5d647e88ddab9e6466a84b9bd9099",
              "content": "42c9af6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca8f00e146c8e0f8da36728677281739e94baebcfdd"
            },
            {
              "iv": "dcd5d647e88ddab9e6466a84b9bd9099",
              "content": "42ceaf6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca9eb0a126c9f099ce6603e66"
            }
        ];
        const newJournal = "My new journal";
        const journals: Array<CryptoHash> = modifyJournals(existingJournals, newJournal);
        const firstJournal: CryptoHash = journals[0];
        expect(decryptJournalEntity(firstJournal)).to.eql('01 Oct 2020 01:30 pm - My new journal');
    });

    it('should add time to journal text', () => {
        const existingJournals = [
            {
              "iv": "dcd5d647e88ddab9e6466a84b9bd9099",
              "content": "42c9af6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca8f00e146c8e0f8da36728677281739e94baebcfdd"
            },
            {
              "iv": "dcd5d647e88ddab9e6466a84b9bd9099",
              "content": "42ceaf6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca9eb0a126c9f099ce6603e66"
            }
        ];
        const newJournal = "My new journal2";
        const journals: Array<CryptoHash> = modifyJournals(existingJournals, newJournal);
        const firstJournal: CryptoHash = journals[0];
        expect(decryptJournalEntity(firstJournal)).to.eql('01 Oct 2020 01:30 pm - My new journal2');
    });

    it('should remove 50th journal if any new comes', () => {
        const existingJournals = [];
        // 48 journals
        for(let i=0; i<48; i++) {
            existingJournals.push({
                iv: "dcd5d647e88ddab9e6466a84b9bd9099",
                content: "42c9af6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca8f00e146c8e0f8da36728677281739e94baebcfdd"
            });
        }
        // 22 Jun 2019 10.30pm - Some text user entered
        existingJournals.push({
            iv: "dcd5d647e88ddab9e6466a84b9bd9099",
            content: "42ceaf6abdfdd754b5d86a5eb9446a3063b08da02f6afb0b3247c27e6c33517ca9eb0a126c9f099ce6603e66"
        });
        // 01 Oct 2020 01:30 pm - My new journal2
        existingJournals.push({
            iv: '98fa77b8f3912f4a37e7cbcf71d4e9a3',
            content: '403b46e28859578cf9e628d7a4f3a7be4807570c6995044e0278e66970a16ddc8b8738c00e0c'
        });
        const newJournal = "My new journal3";
        const journals: Array<CryptoHash> = modifyJournals(existingJournals, newJournal);
        const lastJournal: CryptoHash = journals[journals.length - 1];
        expect(decryptJournalEntity(lastJournal)).to.eql('22 Jun 2019 10.30pm - Some text user entered');
    });
});