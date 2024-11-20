import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { LinksService } from '../../../src/domains/links/services/links.service.js';
import type { LinksRepository } from '../../../src/domains/links/repositories/links.repository.js';
import type { MockedObject } from 'jest-mock';
import { mock } from 'jest-mock-extended';
import type { LinkModel } from '../../../src/domains/links/models/link.model.js';
import {
  DELETED_LINK,
  EXISTENT_LINK,
  LINK_BY_ID,
  mockLink,
} from '../../fixtures/links.fixture.ts';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util.js';
import { v4 as uuid } from 'uuid';
import { EntityNotFoundException } from '../../../src/app/exceptions/EntityNotFoundException.js';
import { LINKS_REPOSITORY } from '../../../src/utils/types/constants/di.constant.js';

describe('LinksService', () => {
  let service: LinksService | null = null;
  let repositoryMock: MockedObject<LinksRepository> | null = null;

  function mockRepository(): void {
    repositoryMock = mock<LinksRepository>();

    repositoryMock.create.mockClear();
    repositoryMock.get.mockClear();
    repositoryMock.delete.mockClear();

    repositoryMock.create.mockImplementation((entity): Promise<LinkModel> => {
      return Promise.resolve(mockLink(entity));
    });

    repositoryMock.get.mockImplementation((id): Promise<LinkModel | null> => {
      const link = LINK_BY_ID[id];

      if (link && !link.deletedAt) return Promise.resolve(link);
      return Promise.resolve(null);
    });

    repositoryMock.delete.mockImplementation(
      (id): Promise<boolean> => Promise.resolve(id === EXISTENT_LINK.id),
    );
  }

  async function mockService(): Promise<void> {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: LINKS_REPOSITORY,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get(LinksService);
  }

  beforeEach(async () => {
    mockRepository();
    await mockService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create link', async () => {
    const payload = randomStringGenerator();
    const link = await service?.createLink({ payload });

    expect(link?.payload).toEqual(payload);
  });

  it('should get existent link', async () => {
    const link = await service?.getLink(EXISTENT_LINK.id);

    expect(link).toEqual(EXISTENT_LINK);
  });

  it('should throw error when trying to get not-existent link', async () => {
    await expect(service?.getLink(uuid())).rejects.toThrow(
      EntityNotFoundException,
    );
  });

  it('should throw error when trying to get deleted link', async () => {
    await expect(service?.getLink(DELETED_LINK.id)).rejects.toThrow(
      EntityNotFoundException,
    );
  });
});
