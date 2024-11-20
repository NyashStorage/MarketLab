import type { CreateLinkRequest } from '../../../src/domains/links/dto/requests/create-link.request.js';
import { supertestAgent } from '../../jest-e2e.setup.ts';
import type { Test } from 'supertest';
import { HttpStatus } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util.js';
import { ApiError } from '../../../src/utils/types/enums/api-error.enum.js';
import { v4 as uuid } from 'uuid';
import { DELETED_LINK, EXISTENT_LINK } from '../../fixtures/links.fixture.ts';

function createLink(body: CreateLinkRequest | any): Test {
  return supertestAgent.post('/links').send(body);
}

function getLink(id: string): Test {
  return supertestAgent.get(`/links/${id}`).send();
}

describe('LinksController', () => {
  describe('[POST] /links', () => {
    it('should return validation error when no data specified', async () => {
      const { body: error } = await createLink(undefined).expect(
        HttpStatus.BAD_REQUEST,
      );

      expect(error.message).toEqual([
        'payload should not be empty',
        'payload must be a string',
      ]);
    });

    it('should return validation error when no payload specified', async () => {
      const { body: error } = await createLink({}).expect(
        HttpStatus.BAD_REQUEST,
      );

      expect(error.message).toEqual([
        'payload should not be empty',
        'payload must be a string',
      ]);
    });

    it('should return validation error when incorrect payload type specified', async () => {
      const { body: error } = await createLink({
        payload: Math.random(),
      }).expect(HttpStatus.BAD_REQUEST);

      expect(error.message).toEqual(['payload must be a string']);
    });

    it('should return validation error when empty payload specified', async () => {
      const { body: error } = await createLink({
        payload: '',
      }).expect(HttpStatus.BAD_REQUEST);

      expect(error.message).toEqual(['payload should not be empty']);
    });

    it('should return link url', async () => {
      const { body: data } = await createLink({
        payload: randomStringGenerator(),
      }).expect(HttpStatus.CREATED);

      expect(data.url).toMatch(
        /https?:\/\/.+\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/,
      );
    });
  });

  describe('[GET] /links/:id', () => {
    it('should return validation error when incorrect id specified', async () => {
      const { body: error } = await getLink(Math.random().toString()).expect(
        HttpStatus.BAD_REQUEST,
      );

      expect(error.message).toEqual(['id must be a uuid']);
    });

    it('should return error when no link found', async () => {
      const { body: error } = await getLink(uuid()).expect(
        HttpStatus.NOT_FOUND,
      );

      expect(error.message).toEqual(ApiError.LINK_NOT_FOUND);
    });

    it('should return error when link deleted', async () => {
      const { body: error } = await getLink(DELETED_LINK.id).expect(
        HttpStatus.NOT_FOUND,
      );

      expect(error.message).toEqual(ApiError.LINK_NOT_FOUND);
    });

    it('should return link payload', async () => {
      const { body: data } = await getLink(EXISTENT_LINK.id).expect(
        HttpStatus.OK,
      );

      expect(data.payload).toEqual(EXISTENT_LINK.payload);
    });

    it('should delete link after getting payload', async () => {
      const { body: data } = await getLink(EXISTENT_LINK.id).expect(
        HttpStatus.OK,
      );

      expect(data.payload).toEqual(EXISTENT_LINK.payload);

      const { body: error } = await getLink(EXISTENT_LINK.id).expect(
        HttpStatus.NOT_FOUND,
      );

      expect(error.message).toEqual(ApiError.LINK_NOT_FOUND);
    });
  });
});
